const { App } = require('@slack/bolt');
const User = require('../models/User');
const Project = require('../models/Project');
const TimeTrack = require('../models/TimeTrack');
require('dotenv').config();

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	appToken: process.env.SLACK_APP_TOKEN,
	socketMode: true,
});

app.command('/time_in', async ({ command, ack, say }) => {
  await ack();

  let [entryDate, timeIn] = command.text.split(' ');

  // Check if the user already exists
  const existingUser = await User.findOne({
    attributes: ['id'],
    where: {
      slackId: command.user_id
    }
  });

  // Check if entryDate already exists for this user
  const date = await TimeTrack.findOne({
    attributes: ['entryDate'],
    where: {
      userId: existingUser ? existingUser.id : null,
      entryDate: entryDate
    }
  });

  // If the user doesn't exist, create a new user
  let userId;
  if (!existingUser) {
    const newUser = await User.create({
      slackId: command.user_id,
      slackName: command.user_name
    });
    userId = newUser.id;
    say(`User created for ${command.user_name}`);
  } else {
    userId = existingUser.id;
  }

  if (date) {
    console.log(date.entryDate)
    say(`User already recorded timeIn details for this date ${date.entryDate}`);
  } else {
    // Create a new TimeTrack record
    TimeTrack.create({
      userId: userId,
      timeIn: timeIn,
      entryDate: entryDate
    }).then(() => {
      say(`Time in recorded for ${command.user_name}`);
    });
  }
});


app.command('/time_out', async ({ command, ack, say }) => {
  await ack();
  
  let [entryDate, timeOut] = command.text.split(' ');
  
  // Find the user by slackId
  const existingUser = await User.findOne({
    attributes: ['id'],
    where: {
      slackId: command.user_id
    }
  });

  if (!existingUser) {
    return say("User not found.");
  }

  // Check if entryDate already exists for this user
  const date = await TimeTrack.findOne({
    attributes: ['entryDate'],
    where: {
      userId: existingUser.id,
      entryDate: entryDate
    }
  });

  if (date) {
    // Update the TimeTrack record with timeOut
    await TimeTrack.update({ timeOut: timeOut }, {
      where: {
        userId: existingUser.id,
        entryDate: entryDate
      }
    });
    say(`Time out recorded for ${command.user_name}`);
  } else {
    say(`No entry found for ${entryDate}`);
  }
});

app.command('/project', async ({ command, ack, say }) => {
  await ack();

  const projectName = command.text;

  // Check if the project with the given name already exists
  const existingProject = await Project.findOne({ 
    attributes: ['name'],
    where: {
      name: projectName
    } 
  });

  if (existingProject) {
    say(`Project "${projectName}" already exists!`);
  } else {
    // Create a new TimeTrack record
    Project.create({
      name: projectName
    }).then(() => {
      say(`Project "${projectName}" recorded!`);
    });
  }
});


app.command('/time_track', async ({ command, ack, say }) => {
  await ack();
  let user;
  let projectTimeTrack;
  let newProjectRecord;
  let existingProject;
  let timeInAndOutResults;

  let [project, hours, timeSpent, entryDate] = command.text.split(' ');
  const existingUser = await User.findOne({
    attributes: ['id'],
    where: {
      slackId: command.user_id
    }
  });

  user = existingUser.id;
  
  timeInAndOutResults = await TimeTrack.findOne({
    attributes: ['timeIn','timeOut'],
    where: {
      userId: user,
      entryDate: entryDate
    }
  });

  if (existingUser) {
    existingProject = await Project.findOne({
      attributes: ['id'],
      where: {
        name: project
      }
    });

    if(existingProject) {
      projectTimeTrack = await TimeTrack.findOne({
        attributes: ['id'],
        where: {
          projectId: existingProject.id,
        }
      });
    } else {
      newProjectRecord = await Project.create({
        name: project
      });
      existingProject = newProjectRecord;
      say(`Project recorded!`);
      
      projectTimeTrack = await TimeTrack.findOne({
        attributes: ['id'],
        where: {
          projectId: existingProject.id,
        }
      });
    }

    if (!projectTimeTrack) {
      TimeTrack.create({
        userId: user,
        timeIn: timeInAndOutResults.timeIn,
        timeOut: timeInAndOutResults.timeOut,
        projectId: existingProject.id,
        hours: hours,
        timeSpent: timeSpent,
        entryDate: entryDate
      }).then(() => {
        say(`Time track recorded for ${command.user_name} on project ${project}`);
      });
    } else {
      await TimeTrack.update({
        projectId: existingProject.id,
        hours: hours,
        timeSpent: timeSpent,
        entryDate: entryDate }, {
          where: {
            userId: user,
          }
      }).then(() => {
        say(`Time track recorded for ${command.user_name} on project ${project}`);
      });
    }
  }
});


module.exports = app;
