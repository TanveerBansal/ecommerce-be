import * as readline from "readline";



const seeds = {
  "1": { name: "Customers", fn: ()=>{} },
  "2": { name: "Products", fn: ()=> {} },
};

function showMenu() {
  console.log("\n Available seeds:");
  console.log("-".repeat(40));

  Object.entries(seeds).forEach(([key, seed]) => {
    console.log(`  ${key}. ${seed.name}`);
  });

  console.log(`  A. Run All Seeds`);
  console.log(`  Q. Quit`);
  console.log("─".repeat(40));
}

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function runSeed(key: string) {
  const seed = seeds[key as keyof typeof seeds];
  console.log(`\n Running seed ${seed.name}...`);
  await seed.fn;
  console.log(`${seed.name} completed`);
}

async function runAllSeeds() {
  console.log(`\n Running all seeds...`);
  for (const key of Object.keys(seeds)) {
    await runSeed(key);
  }
  console.log("\n✅ All seeds completed!");
}

async function main() {
  const arg = process.argv[2]?.toLowerCase();

  if (arg) {
    const found = Object.entries(seeds).find(([_, s]) => s.name.toLowerCase() === arg);
    if (found) {
      await runSeed(arg);
    } else if (arg === "all") {
      await runAllSeeds();
    } else {
      console.log(`❌ Unknown seed: ${arg}`);
      console.log(
        "Available:",
        Object.values(seeds)
          .map((s) => s.name)
          .join(", "),
        "all",
      );
    }
    process.exit(0);
  }

  console.clear();
  console.log("Seed Runner\n");

  let running = true;

  while (running) {
    showMenu();
    const answer = (await askQuestion("\n Select option:")).toUpperCase();

    if (answer === "q" || answer === "Q") {
      console.log("👋 Goodbye!");
      running = false;
    } else if (answer === "a" || answer === "A") {
      await runAllSeeds();
      running = false;
    } else if (seeds[answer as keyof typeof seeds]) {
      await runSeed(answer);
      const again = await askQuestion("\n👉 Run another? (y/n): ");
      if (again.toLowerCase() !== "y") {
        console.log("👋 Goodbye!");
        running = false;
      }
      console.clear();
    } else {
      console.log("\n❌ Invalid option! Try again.");
    }
  }
  process.exit(0);
}

main();
