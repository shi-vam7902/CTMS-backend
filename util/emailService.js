require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "shivamshah.sus@gmail.com",
    pass: "wrcrewyjklqrisvs",
  },
});

const newProjectEmailTemplate = (project) => {
  return `
    <h1>New Project Received</h1>
    <p>We have received a new project from a client:</p>
    <ul>
      <li>Project Name: ${project.projectName}</li>
      <li>Description: ${project.projectDesc}</li>
      <li>Start Date: ${project.projectStartDate}</li>
      <li>Due Date: ${project.projectDueDate}</li>
    </ul>
  `;
};

// Function to send an email to all users
const sendNewProjectEmail = (emails, project) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variables
    to: emails.join(","),
    subject: "New Project Received",
    html: newProjectEmailTemplate(project),
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log("Emails sent successfully");
    })
    .catch((error) => {
      console.error("Error sending emails:", error);
    });
};

// Function to send email notification to the creator
const sendTaskAssignedEmail = (creatorEmail, taskData) => {
  const subject = "Task Assigned Notification";
  const html = `
    <h1>Task Assigned Notification</h1>
    <p>Hello ${taskData.creator},</p>
    <p>You have assigned a task with the following details:</p>
    <ul>
      <li>Task Name: ${taskData.taskName}</li>
      <li>Description: ${taskData.taskDesc}</li>
      <li>Due Date: ${taskData.taskDueDate}</li>
    </ul>
    <p>Regards,<br>Your Task App</p>
  `;

  sendEmail(creatorEmail, subject, html);
};

// Function to send email notification to each member
const sendNewTaskNotification = (userEmail, taskData) => {
  const subject = "New Task Notification";
  const html = `Hello ${userEmail},<br><br>
  A new task "${taskData.taskName}" has been added with due date ${taskData.dueDate}.<br><br>
  Regards,<br>
  Your Task App`;

  sendEmail(userEmail, subject, html);
};

// Function to send email
const sendEmail = async (recipient, subject, html) => {
  try {
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: subject,
      html: html,
    });
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendNewProjectEmail,
  sendTaskAssignedEmail,
  sendNewTaskNotification,
};
