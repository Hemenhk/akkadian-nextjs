export type FormFieldsType = {
    type: string
    name: string
    label: string
    placeholder: string
}

export const announcementFields = [
  {
    type: "text",
    label: "Announcement Text",
    placeholder: "announcement text",
    name: "announcementText",
  },
  {
    type: "color",
    label: "Announcement Background Color",
    placeholder: "announcement color",
    name: "announcementColor",
  },
];

export const footerFields = [
  {
    type: "color",
    label: "Footer Background Color",
    placeholder: "footer background color",
    name: "footerBackgroundColor",
  },
];

export const heroFields = [
  {
    type: "text",
    label: "Hero Heading",
    placeholder: "hero heading",
    name: "heroHeading",
  },
  {
    type: "text",
    label: "Hero Sub-Heading",
    placeholder: "hero sub-heading",
    name: "heroSubHeading",
  },
  {
    type: "text",
    label: "Hero Button Text",
    placeholder: "hero sub-heading",
    name: "heroButtonText",
  },
  {
    type: "color",
    label: "Hero Button Background Color",
    placeholder: "hero button background color",
    name: "heroButtonColor",
  },
];
