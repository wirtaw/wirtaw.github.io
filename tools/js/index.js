const tools = [
  {
    url: "https://password.link/en",
    title: "Securely send and receive sensitive information",
    description: "Securely send and receive sensitive information",
    tags: ["security", "sharing"],
  },
  {
    url: "https://eu.onetimesecret.com/",
    title: "Paste a password, secret message or private link below.",
    description: "Paste a password, secret message or private link below.",
    tags: ["security", "secrets"],
  },
  {
    url: "https://musicforprogramming.net/about",
    title: "MusicforProgramming",
    description: "MusicforProgramming",
    tags: ["music", "productivity"],
  },
  {
    url: "https://endoflife.date/",
    title: "End-of-life (EOL)",
    description: "End-of-life (EOL)",
    tags: ["information", "lifecycle"],
  },
  {
    url: "https://editor.mergely.com/",
    title: "Diff and merge",
    description: "Diff and merge",
    tags: ["development", "diff", "merge"],
  },
  {
    url: "https://www.artillery.io/docs/get-started/get-artillery",
    title: "Get Artillery",
    description: "Get Artillery",
    tags: ["development", "testing"],
  },
  {
    url: "https://jsoneditoronline.org/#right=local.wivadi",
    title: "JSON Editor online",
    description: "JSON Editor online",
    tags: ["json", "development"],
  },
  {
    url: "https://jsonformatter.org/json-pretty-print",
    title: "JSON Formatter",
    description: "JSON Formatter",
    tags: ["json", "development"],
  },
  {
    url: "https://jsonhero.io/",
    title: "JSON Hero",
    description: "JSON Hero",
    tags: ["json", "development"],
  },
  {
    url: "https://www.liquid-technologies.com/online-json-to-schema-converter",
    title: "JSON to schema converter",
    description: "JSON to schema converter",
    tags: ["json", "schema", "development"],
  },
  {
    url: "https://www.jsonschemavalidator.net/",
    title: "JSON Schema validator",
    description: "JSON Schema validator",
    tags: ["json", "schema", "development"],
  },
  {
    url: "https://www.programiz.com/html/online-compiler/",
    title: "Online HTML Editor",
    description: "Online HTML Editor",
    tags: ["html", "development", "editor"],
  },
  {
    url: "https://www.timeanddate.com/worldclock/converter.html?iso=20250310T120000&p1=660&p2=781&p3=tz_cet&p4=179&p5=tz_gmt",
    title: "Time Zone Converter – Time Difference Calculator",
    description: "Time Zone Converter – Time Difference Calculator",
    tags: ["time", "utility"],
  },
  {
    url: "https://mermaid.live/edit",
    title: "Mermaid Live Editor",
    description: "Mermaid Live Editor",
    tags: ["diagram", "editor"],
  },
  {
    url: "https://www.mermaidchart.com/",
    title: "Mermaid Chart",
    description: "Mermaid Chart",
    tags: ["diagram", "chart"],
  },
  {
    url: "https://regex101.com/",
    title: "ReGex",
    description: "ReGex",
    tags: ["regex", "development"],
  },
  {
    url: "https://www.fakepersongenerator.com/Random/address_generator",
    title: "Address generator",
    description: "Address generator",
    tags: ["utility", "generator"],
  },
  {
    url: "https://resources.jointjs.com/tutorial/vue-ts",
    title: "JointJS",
    description: "Diagram with JS",
    tags: ["diagram", "javascript"],
  },
  {
    url: "https://github.com/tree-sitter/node-tree-sitter",
    title: "Tree sitter",
    description:
      "This module provides Node.js bindings to the [tree-sitter] parsing library.",
    tags: ["development", "parsing"],
  },
  {
    url: "https://www.uuidgenerator.net/version4",
    title: "Online UUID Generator",
    description: "Online UUID Generator",
    tags: ["utility", "generator"],
  },
  {
    url: "https://node-modules.dev/grid/depth",
    title: "Node modules graph",
    description: "Node modules graph",
    tags: ["development", "graph"],
  },
  {
    url: "https://plantuml.com/mindmap-diagram",
    title: "Plant UML Mindmap",
    description: "Plant UML Mindmap",
    tags: ["diagram", "uml"],
  },
  {
    url: "https://www.measurethat.net/",
    title: "MeasureThat",
    description:
      "Create a benchmark, measure performance of the JavaScript code and pick the fastest version.",
    tags: ["development", "performance", "benchmark"],
  },
  {
    url: "https://vert.sh/",
    title: "The file converter you'll love",
    description:
      "All image, audio, and document processing is done on your device. Videos are converted on our lightning-fast servers. No file size limit, no ads, and completely open source.",
    tags: ["document", "convert", "utility"],
  },
  {
    url: "https://explainshell.com/",
    title: "The Power shell",
    description:
      "write down a command-line to see the help text that matches each argument",
    tags: ["shell", "linux", "terminL"],
  },
  {
    url: "https://brandmint.ai/color-genie",
    title: "Find the perfect color",
    description: "Describe the mood, style, vibe of the color you want. Or anything for that matter. We'll find the best options from an aggregated library of over 30,000 named colors.",
    tags: ["web-development", "color", "design"],
  },
  {
    url: "https://free-for.dev/#/",
    title: "Free for dev",
    description: "Developers and Open Source authors now have many services offering free tiers, but finding them all takes time to make informed decisions.",
    tags: ["utility", "tools", "development"],
  },
  {
    url: "https://devresourc.es/",
    title: "Free for dev",
    description: "Get every campaign on the same page with a tool that helps you work better, faster, and based on results.",
    tags: ["utility", "tools", "development", "resources"],
  },
  {
    url: 'https://github.com/pahen/madge',
    title: "Madge",
    description: "Developer tool for generating a visual graph of your module dependencies, finding circular dependencies, and giving you other useful info",
    tags: ["utility", "tools", "graph", "dependencies"],
  },
  {
    url: 'https://yamline.com/',
    title: "Yamline",
    description: "Yamline is a tool for a powerful and widely-used format, especially for configuration management in platforms like Kubernetes and beyond. Here, you'll find a curated collection of tools tailored to streamline your YAML workflow. While advancements in AI may reduce the need for some of these tools, they will continue to be invaluable to many developers working with YAML",
    tags: ["utility", "tools", "yaml", "development", "configuration", "kubernetes", "ai", "workflow"],
  },
];

const toolsContainer = document.getElementById("tools-container");

tools.forEach((tool) => {
  const card = document.createElement("div");
  card.className = "column is-one-third";
  card.innerHTML = `
      <div class="card">
          <div class="card-content">
              <p class="title is-4"><a href="${tool.url}" target="_blank">${
    tool.title
  }</a></p>
              <p class="subtitle is-6">${tool.description}</p>
              <div class="tags">
                  ${tool.tags
                    .map((tag) => `<span class="tag">${tag}</span>`)
                    .join("")}
              </div>
          </div>
      </div>
  `;
  toolsContainer.appendChild(card);
});
