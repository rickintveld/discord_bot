import config from "../../config.json" assert { type: "json" };
const is_admin = (member) => {
  return Number(member.user.discriminator) === config.admin.discriminator;
};

export default is_admin;
