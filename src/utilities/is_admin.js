import config from "../../config.json" assert { type: "json" };
const is_admin = (member) => {
  return [config.admin.rick.id, config.admin.nils.id].includes(member.user.id);
};

export default is_admin;
