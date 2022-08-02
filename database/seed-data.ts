interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Pendiente: Sint do dolore qui occaecat quis ipsum est sint nulla.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "En Progreso: Cupidatat exercitation cillum pariatur qui laborum incididunt anim.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        "Terminada: Magna consectetur eiusmod irure mollit ipsum ullamco enim eiusmod ut nostrud voluptate quis anim ipsum.",
      status: "finished",
      createdAt: Date.now() - 10000000000,
    },
  ],
};
