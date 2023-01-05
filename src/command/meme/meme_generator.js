import { SlashCommandBuilder } from "discord.js";
import meme_repository from "../../repository/meme_repository.js";

const data = new SlashCommandBuilder()
  .setName("meme")
  .setDescription("Generates a meme")
  .addStringOption((option) =>
    option
      .setName("meme")
      .setDescription("The image of the meme")
      .setRequired(true)
      .addChoices(
        { name: "Aaaaand-Its-Gone", value: "Aaaaand-Its-Gone" },
        { name: "Ancient-Aliens", value: "Ancient-Aliens" },
        { name: "Angry-Chef-Gordon-Ramsay", value: "Angry-Chef-Gordon-Ramsay" },
        { name: "Baby-Godfather", value: "Baby-Godfather" },
        { name: "Bad-Luck-Brian", value: "Bad-Luck-Brian" },
        { name: "Back-In-My-Day", value: "Back-In-My-Day" },
        { name: "Buddy-Christ", value: "Buddy-Christ" },
        {
          name: "But-Thats-None-Of-My-Business",
          value: "But-Thats-None-Of-My-Business",
        },
        { name: "Chicken-Bob", value: "Chicken-Bob" },
        { name: "Computer-Guy", value: "Computer-Guy" },
        { name: "Computer-Guy-Facepalm", value: "Computer-Guy-Facepalm" },
        { name: "Cereal-Guy-Spitting", value: "Cereal-Guy-Spitting" },
        { name: "Dr-Evil-Laser", value: "Dr-Evil-Laser" },
        { name: "Frustrated-Boromir", value: "Frustrated-Boromir" },
        {
          name: "I-Bet-Hes-Thinking-About-Other-Women",
          value: "I-Bet-Hes-Thinking-About-Other-Women",
        },
        { name: "Matrix-Morpheus", value: "Matrix-Morpheus" },
        {
          name: "Nicolas-Cage---You-dont-say",
          value: "Nicolas-Cage---You-dont-say",
        }
      )
  )
  .addStringOption((option) =>
    option
      .setName("top_text")
      .setDescription("The top text of the meme")
      .setRequired(false)
  )
  .addStringOption((option) =>
    option
      .setName("bottom_text")
      .setDescription("The bottom text of the meme")
      .setRequired(false)
  );

const execute = async (client, interaction) => {
  const meme = interaction.options.getString("meme", true);
  const top_text = interaction.options.getString("top_text", false);
  const bottom_text = interaction.options.getString("bottom_text", false);

  const meme_image = meme_repository.generate(meme, top_text, bottom_text);

  interaction.reply(`${meme_image}`);
};

const meme_generator = { data, execute };

export default meme_generator;
