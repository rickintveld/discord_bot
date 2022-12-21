const has_attachments = (message) => {
  return message.attachments.size > 0;
};

export default has_attachments;
