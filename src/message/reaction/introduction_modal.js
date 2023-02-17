import {
  Events,
  ActionRowBuilder,
  TextInputBuilder,
  ModalBuilder,
  TextInputStyle,
} from "discord.js";

const introduction_modal = async (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton() && interaction.customId === "introduce_btn") {
      const modal = new ModalBuilder()
        .setCustomId("introduction_modal")
        .setTitle("Introduction");

      const nameInput = new TextInputBuilder()
        .setCustomId("nameInput")
        .setLabel("What's your name?")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const experienceInput = new TextInputBuilder()
        .setCustomId("experienceInput")
        .setLabel("Time in trading?")
        .setPlaceholder("x month(s) / x year(s)")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const instrumentsInput = new TextInputBuilder()
        .setCustomId("instrumentsInput")
        .setLabel("Trading instruments?")
        .setPlaceholder("EUR/USD, ...")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const fundingInput = new TextInputBuilder()
        .setCustomId("fundingInput")
        .setLabel("Funding?")
        .setPlaceholder("FTMO, MFF, Personal, ...")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const journeyStageInput = new TextInputBuilder()
        .setCustomId("journeyStageInput")
        .setLabel("Your journey stage?")
        .setPlaceholder("1, 2, 3, 4, 5 or 6")
        .setMaxLength(1)
        .setMinLength(1)
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const nameInputRow = new ActionRowBuilder().addComponents(nameInput);
      const fundingInputRow = new ActionRowBuilder().addComponents(
        fundingInput
      );
      const journeyStageInputRow = new ActionRowBuilder().addComponents(
        journeyStageInput
      );
      const instrumentsInputRow = new ActionRowBuilder().addComponents(
        instrumentsInput
      );
      const experienceInputRow = new ActionRowBuilder().addComponents(
        experienceInput
      );

      modal.addComponents(
        nameInputRow,
        experienceInputRow,
        instrumentsInputRow,
        fundingInputRow,
        journeyStageInputRow
      );

      await interaction.showModal(modal);
    }
  });
};

export default introduction_modal;
