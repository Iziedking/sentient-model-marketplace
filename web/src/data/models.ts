export type Model = {
  id: string;
  slug: string;
  name: string;
  owner: string;
  category: "LLM" | "Vision" | "Audio" | "Tooling";
  tags: string[];
  pricePer1k: number;
  latencyMs: number;
  rating: number;
  short: string;
};

export const MODELS: Model[] = [
{
    id: "m33", slug: "scribe-legal", name: "Scribe-Legal", owner: "Juris AI",
    category: "LLM", tags: ["legal", "summarize"], pricePer1k: 0.0022,
    latencyMs: 720, rating: 4.2, short: "Summarizes legal briefs with citation preservation.",
  },
  {
    id: "m34", slug: "mentor-math", name: "Mentor-Math", owner: "BrightMind",
    category: "LLM", tags: ["tutor", "math"], pricePer1k: 0.0012,
    latencyMs: 400, rating: 4.1, short: "Step-by-step math tutor with LaTeX formatting.",
  },
  {
    id: "m35", slug: "vision-med", name: "Vision-Med", owner: "MedAI Labs",
    category: "Vision", tags: ["medical", "xray", "mri"], pricePer1k: 0.0035,
    latencyMs: 900, rating: 4.6, short: "Assists radiologists by spotting anomalies in scans.",
  },
  {
    id: "m36", slug: "vision-style", name: "Vision-Style", owner: "Cambria",
    category: "Vision", tags: ["style", "transfer"], pricePer1k: 0.0025,
    latencyMs: 800, rating: 4.0, short: "Neural style transfer for creative pipelines.",
  },
  {
    id: "m37", slug: "audio-clean", name: "Audio-Clean", owner: "AudioWorks",
    category: "Audio", tags: ["denoise", "clean"], pricePer1k: 0.0013,
    latencyMs: 450, rating: 4.2, short: "Background noise removal for meetings and calls.",
  },
  {
    id: "m38", slug: "pulse-multivoice", name: "Pulse-MultiVoice", owner: "Lingua AI",
    category: "Audio", tags: ["tts", "voices"], pricePer1k: 0.0018,
    latencyMs: 600, rating: 4.4, short: "Generates multiple natural voices for dialogue.",
  },
  {
    id: "m39", slug: "router-speed", name: "Router-Speed", owner: "Sentient Labs",
    category: "Tooling", tags: ["router", "latency"], pricePer1k: 0.0004,
    latencyMs: 100, rating: 4.1, short: "Latency-optimized routing for multi-model stacks.",
  },
  {
    id: "m40", slug: "shield-finance", name: "Shield-Finance", owner: "GuardAI",
    category: "Tooling", tags: ["finance", "fraud"], pricePer1k: 0.0013,
    latencyMs: 330, rating: 4.3, short: "Detects suspicious financial behaviors in text.",
  },
  {
    id: "m41", slug: "aurora-3b", name: "Aurora-3B", owner: "Sentient Labs",
    category: "LLM", tags: ["compact", "edge"], pricePer1k: 0.0004,
    latencyMs: 230, rating: 4.0, short: "Tiny assistant model for edge devices.",
  },
  {
    id: "m42", slug: "aurora-90b", name: "Aurora-90B", owner: "Sentient Labs",
    category: "LLM", tags: ["reasoning", "analysis"], pricePer1k: 0.0040,
    latencyMs: 1050, rating: 4.7, short: "Heavy reasoning for complex business tasks.",
  },
  {
    id: "m43", slug: "nebula-research", name: "Nebula-Research", owner: "OpenStack AI",
    category: "LLM", tags: ["research", "citations"], pricePer1k: 0.0018,
    latencyMs: 640, rating: 4.3, short: "Research-style responses with structured citations.",
  },
  {
    id: "m44", slug: "nebula-agent", name: "Nebula-Agent", owner: "OpenStack AI",
    category: "LLM", tags: ["agents", "tools"], pricePer1k: 0.0019,
    latencyMs: 690, rating: 4.4, short: "Tool-using agent behaviors with JSON traces.",
  },
  {
    id: "m45", slug: "helix-guard-pro", name: "Helix-Guard-Pro", owner: "GuardAI",
    category: "LLM", tags: ["moderation", "policy"], pricePer1k: 0.0011,
    latencyMs: 360, rating: 4.5, short: "Advanced moderation tuned for enterprise policies.",
  },
  {
    id: "m46", slug: "scribe-news", name: "Scribe-News", owner: "Cortex Forge",
    category: "LLM", tags: ["summarize", "news"], pricePer1k: 0.0013,
    latencyMs: 520, rating: 4.1, short: "Summarizes articles with bias-sensitive language.",
  },
  {
    id: "m47", slug: "mentor-code", name: "Mentor-Code", owner: "BrightMind",
    category: "LLM", tags: ["code", "review"], pricePer1k: 0.0016,
    latencyMs: 560, rating: 4.3, short: "Explains diffs and suggests clean refactors.",
  },
  {
    id: "m48", slug: "atlas-4b", name: "Atlas-4B", owner: "Maple AI",
    category: "LLM", tags: ["general", "compact"], pricePer1k: 0.0005,
    latencyMs: 270, rating: 4.0, short: "Compact assistant optimized for speed.",
  },
  {
    id: "m49", slug: "ledger-contracts", name: "Ledger-Contracts", owner: "Juris AI",
    category: "LLM", tags: ["contracts", "analysis"], pricePer1k: 0.0021,
    latencyMs: 720, rating: 4.3, short: "Analyzes contracts and flags risky clauses.",
  },
  {
    id: "m50", slug: "vista-seg-pro", name: "Vista-SEG-Pro", owner: "Visionary",
    category: "Vision", tags: ["segmentation", "masks"], pricePer1k: 0.0030,
    latencyMs: 860, rating: 4.4, short: "High-accuracy segmentation for production.",
  },
  {
    id: "m51", slug: "vista-vqa", name: "Vista-VQA", owner: "Visionary",
    category: "Vision", tags: ["vqa", "qa"], pricePer1k: 0.0027,
    latencyMs: 820, rating: 4.2, short: "Visual question answering for product imagery.",
  },
  {
    id: "m52", slug: "vista-clip-xl", name: "Vista-CLIP-XL", owner: "Visionary",
    category: "Vision", tags: ["embed", "xl"], pricePer1k: 0.0022,
    latencyMs: 740, rating: 4.3, short: "XL embeddings for image-text retrieval.",
  },
  {
    id: "m53", slug: "percept-det-lite", name: "Percept-DET-Lite", owner: "Percept Labs",
    category: "Vision", tags: ["detection", "lite"], pricePer1k: 0.0017,
    latencyMs: 520, rating: 4.0, short: "Lite detector for on-device use.",
  },
  {
    id: "m54", slug: "percept-ocr-pro", name: "Percept-OCR-Pro", owner: "Percept Labs",
    category: "Vision", tags: ["ocr", "layout"], pricePer1k: 0.0024,
    latencyMs: 760, rating: 4.2, short: "OCR with layout-aware table extraction.",
  },
  {
    id: "m55", slug: "focus-quality", name: "Focus-Quality", owner: "Cambria",
    category: "Vision", tags: ["qa", "quality"], pricePer1k: 0.0020,
    latencyMs: 730, rating: 4.1, short: "Visual quality checks for manufacturing.",
  },
  {
    id: "m56", slug: "lens-colorist", name: "Lens-Colorist", owner: "Cambria",
    category: "Vision", tags: ["color", "enhance"], pricePer1k: 0.0021,
    latencyMs: 710, rating: 4.0, short: "Color enhancement & harmonization for media.",
  },
  {
    id: "m57", slug: "echo-meeting", name: "Echo-Meeting", owner: "AudioWorks",
    category: "Audio", tags: ["asr", "meeting"], pricePer1k: 0.0017,
    latencyMs: 590, rating: 4.2, short: "ASR tuned for multi-speaker meetings.",
  },
  {
    id: "m58", slug: "echo-callcenter", name: "Echo-CallCenter", owner: "AudioWorks",
    category: "Audio", tags: ["asr", "contact-center"], pricePer1k: 0.0018,
    latencyMs: 610, rating: 4.3, short: "Contact-center ASR with telephony acoustics.",
  },
  {
    id: "m59", slug: "sonic-keyword", name: "Sonic-Keyword", owner: "Lingua AI",
    category: "Audio", tags: ["keyword", "spotting"], pricePer1k: 0.0014,
    latencyMs: 460, rating: 4.0, short: "Hotword/keyword spotter for voice apps.",
  },
  {
    id: "m60", slug: "pulse-voicefix", name: "Pulse-VoiceFix", owner: "Lingua AI",
    category: "Audio", tags: ["enhance", "clarity"], pricePer1k: 0.0015,
    latencyMs: 520, rating: 4.1, short: "Voice enhancement for podcasts & streams.",
  },
  {
    id: "m61", slug: "router-failsafe", name: "Router-FailSafe", owner: "Sentient Labs",
    category: "Tooling", tags: ["router", "fallback"], pricePer1k: 0.0006,
    latencyMs: 160, rating: 4.2, short: "Adds fallback chains for reliability.",
  },
  {
    id: "m62", slug: "router-multimodal", name: "Router-Multimodal", owner: "Sentient Labs",
    category: "Tooling", tags: ["router", "vision", "audio"], pricePer1k: 0.0007,
    latencyMs: 200, rating: 4.3, short: "Routes text, image, and audio tasks automatically.",
  },
  {
    id: "m63", slug: "judge-safety", name: "Judge-Safety", owner: "EvalWorks",
    category: "Tooling", tags: ["eval", "safety"], pricePer1k: 0.0010,
    latencyMs: 280, rating: 4.1, short: "Scores prompts/outputs for safety compliance.",
  },
  {
    id: "m64", slug: "judge-answers", name: "Judge-Answers", owner: "EvalWorks",
    category: "Tooling", tags: ["eval", "factuality"], pricePer1k: 0.0011,
    latencyMs: 300, rating: 4.2, short: "Ranks candidate answers by relevance/factuality.",
  },
  {
    id: "m65", slug: "rerank-qa-pro", name: "Rerank-QA-Pro", owner: "EvalWorks",
    category: "Tooling", tags: ["rerank", "qa"], pricePer1k: 0.0012,
    latencyMs: 320, rating: 4.2, short: "Reranks long-context QA candidates efficiently.",
  },
  {
    id: "m66", slug: "shield-privacy", name: "Shield-Privacy", owner: "GuardAI",
    category: "Tooling", tags: ["pii", "redact"], pricePer1k: 0.0012,
    latencyMs: 280, rating: 4.3, short: "PII detection and redaction for logs & chats.",
  },
  {
    id: "m67", slug: "shield-brand", name: "Shield-Brand", owner: "GuardAI",
    category: "Tooling", tags: ["brand", "tone"], pricePer1k: 0.0010,
    latencyMs: 260, rating: 4.0, short: "Ensures outputs match brand tone/policy.",
  },
  {
    id: "m68", slug: "scribe-meeting", name: "Scribe-Meeting", owner: "Cortex Forge",
    category: "LLM", tags: ["notes", "action-items"], pricePer1k: 0.0014,
    latencyMs: 520, rating: 4.2, short: "Meeting summarizer with action-item extraction.",
  },
  {
    id: "m69", slug: "scribe-support", name: "Scribe-Support", owner: "Cortex Forge",
    category: "LLM", tags: ["support", "kb"], pricePer1k: 0.0013,
    latencyMs: 510, rating: 4.1, short: "Support ticket summarizer linked to KB.",
  },
  {
    id: "m70", slug: "mentor-writing", name: "Mentor-Writing", owner: "BrightMind",
    category: "LLM", tags: ["writing", "edit"], pricePer1k: 0.0012,
    latencyMs: 430, rating: 4.1, short: "Clarity edits and tone adjustments for drafts.",
  },
  {
    id: "m71", slug: "mentor-interview", name: "Mentor-Interview", owner: "BrightMind",
    category: "LLM", tags: ["interview", "prep"], pricePer1k: 0.0011,
    latencyMs: 420, rating: 4.0, short: "Generates interview Q&A and feedback.",
  },
  {
    id: "m72", slug: "aurora-32k", name: "Aurora-32K", owner: "Sentient Labs",
    category: "LLM", tags: ["long-context", "chat"], pricePer1k: 0.0021,
    latencyMs: 700, rating: 4.4, short: "Long-context variant for big documents.",
  },
  {
    id: "m73", slug: "aurora-128k", name: "Aurora-128K", owner: "Sentient Labs",
    category: "LLM", tags: ["long-context", "analysis"], pricePer1k: 0.0032,
    latencyMs: 980, rating: 4.6, short: "Extended context for deep multi-doc analysis.",
  },
  {
    id: "m74", slug: "nebula-finetune", name: "Nebula-Finetune", owner: "OpenStack AI",
    category: "LLM", tags: ["finetune", "adapters"], pricePer1k: 0.0017,
    latencyMs: 610, rating: 4.2, short: "Adapter-friendly variant for custom tasks.",
  },
  {
    id: "m75", slug: "nebula-guard", name: "Nebula-Guard", owner: "OpenStack AI",
    category: "LLM", tags: ["moderation", "guard"], pricePer1k: 0.0011,
    latencyMs: 350, rating: 4.3, short: "Light moderation for chat deployments.",
  },
  {
    id: "m76", slug: "vista-layout", name: "Vista-Layout", owner: "Visionary",
    category: "Vision", tags: ["layout", "doc"], pricePer1k: 0.0023,
    latencyMs: 720, rating: 4.2, short: "Document layout detection + reading order.",
  },
  {
    id: "m77", slug: "vista-table", name: "Vista-Table", owner: "Visionary",
    category: "Vision", tags: ["tables", "ocr"], pricePer1k: 0.0024,
    latencyMs: 740, rating: 4.2, short: "Detects and extracts tables from documents.",
  },
  {
    id: "m78", slug: "percept-face", name: "Percept-Face", owner: "Percept Labs",
    category: "Vision", tags: ["face", "landmarks"], pricePer1k: 0.0016,
    latencyMs: 520, rating: 4.0, short: "Face detection & landmarks (privacy-aware).",
  },
  {
    id: "m79", slug: "percept-sku", name: "Percept-SKU", owner: "Percept Labs",
    category: "Vision", tags: ["retail", "sku"], pricePer1k: 0.0019,
    latencyMs: 610, rating: 4.1, short: "Retail SKU detection for shelf analytics.",
  },
  {
    id: "m80", slug: "lens-upscale", name: "Lens-Upscale", owner: "Cambria",
    category: "Vision", tags: ["upscale", "enhance"], pricePer1k: 0.0022,
    latencyMs: 760, rating: 4.2, short: "Super-resolution upscaler for images.",
  },
  {
    id: "m81", slug: "lens-remaster", name: "Lens-Remaster", owner: "Cambria",
    category: "Vision", tags: ["restore", "clean"], pricePer1k: 0.0023,
    latencyMs: 780, rating: 4.1, short: "Restores old photos with artifact removal.",
  },
  {
    id: "m82", slug: "echo-translate", name: "Echo-Translate", owner: "AudioWorks",
    category: "Audio", tags: ["asr", "translate"], pricePer1k: 0.0020,
    latencyMs: 650, rating: 4.2, short: "Transcribes + translates speech to target language.",
  },
  {
    id: "m83", slug: "echo-summarize", name: "Echo-Summarize", owner: "AudioWorks",
    category: "Audio", tags: ["asr", "summary"], pricePer1k: 0.0019,
    latencyMs: 610, rating: 4.1, short: "Summarizes long recordings into concise notes.",
  },
  {
    id: "m84", slug: "sonic-augment", name: "Sonic-Augment", owner: "Lingua AI",
    category: "Audio", tags: ["augmentation", "dataset"], pricePer1k: 0.0014,
    latencyMs: 480, rating: 4.0, short: "Audio augmentation for training datasets.",
  },
  {
    id: "m85", slug: "pulse-voiceclone", name: "Pulse-VoiceClone", owner: "Lingua AI",
    category: "Audio", tags: ["tts", "clone"], pricePer1k: 0.0022,
    latencyMs: 680, rating: 4.3, short: "Basic voice cloning for narration.",
  },
  {
    id: "m86", slug: "router-govern", name: "Router-Govern", owner: "Sentient Labs",
    category: "Tooling", tags: ["governance", "policy"], pricePer1k: 0.0008,
    latencyMs: 210, rating: 4.2, short: "Governance-aware routing with audit logs.",
  },
  {
    id: "m87", slug: "router-audit", name: "Router-Audit", owner: "Sentient Labs",
    category: "Tooling", tags: ["audit", "trace"], pricePer1k: 0.0008,
    latencyMs: 220, rating: 4.2, short: "Adds structured traces for each routed call.",
  },
  {
    id: "m88", slug: "judge-style", name: "Judge-Style", owner: "EvalWorks",
    category: "Tooling", tags: ["style", "eval"], pricePer1k: 0.0010,
    latencyMs: 270, rating: 4.0, short: "Scores responses on tone and clarity.",
  },
  {
    id: "m89", slug: "judge-relevance", name: "Judge-Relevance", owner: "EvalWorks",
    category: "Tooling", tags: ["eval", "relevance"], pricePer1k: 0.0011,
    latencyMs: 300, rating: 4.1, short: "Measures relevance against a query/intent.",
  },
  {
    id: "m90", slug: "shield-harassment", name: "Shield-Harassment", owner: "GuardAI",
    category: "Tooling", tags: ["moderation", "abuse"], pricePer1k: 0.0011,
    latencyMs: 290, rating: 4.2, short: "Detects harassment & abusive content.",
  },
  {
    id: "m91", slug: "shield-pii-lite", name: "Shield-PII-Lite", owner: "GuardAI",
    category: "Tooling", tags: ["pii", "lite"], pricePer1k: 0.0010,
    latencyMs: 250, rating: 4.1, short: "Lightweight PII detector for edge.",
  },
  {
    id: "m92", slug: "aurora-guardrails", name: "Aurora-Guardrails", owner: "Sentient Labs",
    category: "LLM", tags: ["guardrails", "policy"], pricePer1k: 0.0010,
    latencyMs: 360, rating: 4.3, short: "Aurora variant with policy-abiding outputs.",
  },
  {
    id: "m93", slug: "aurora-translate", name: "Aurora-Translate", owner: "Sentient Labs",
    category: "LLM", tags: ["translate", "multilingual"], pricePer1k: 0.0016,
    latencyMs: 540, rating: 4.2, short: "Multilingual chat & translation.",
  },
  {
    id: "m94", slug: "nebula-32k", name: "Nebula-32K", owner: "OpenStack AI",
    category: "LLM", tags: ["long-context", "instruct"], pricePer1k: 0.0020,
    latencyMs: 690, rating: 4.3, short: "Instruct model with extended context window.",
  },
  {
    id: "m95", slug: "nebula-cite", name: "Nebula-Cite", owner: "OpenStack AI",
    category: "LLM", tags: ["citations", "sources"], pricePer1k: 0.0018,
    latencyMs: 620, rating: 4.2, short: "Produces structured citations for claims.",
  },
  {
    id: "m96", slug: "vista-multimodal", name: "Vista-Multimodal", owner: "Visionary",
    category: "Vision", tags: ["image", "text"], pricePer1k: 0.0026,
    latencyMs: 820, rating: 4.3, short: "Image+text reasoning for product listings.",
  },
  {
    id: "m97", slug: "vista-qa-lite", name: "Vista-QA-Lite", owner: "Visionary",
    category: "Vision", tags: ["vqa", "lite"], pricePer1k: 0.0018,
    latencyMs: 590, rating: 4.0, short: "Lite visual QA for on-device experiences.",
  },
  {
    id: "m98", slug: "percept-caption-lite", name: "Percept-Caption-Lite", owner: "Percept Labs",
    category: "Vision", tags: ["caption", "lite"], pricePer1k: 0.0017,
    latencyMs: 560, rating: 4.0, short: "Captioning tuned for speed on mobile.",
  },
  {
    id: "m99", slug: "percept-embed-pro", name: "Percept-Embed-Pro", owner: "Percept Labs",
    category: "Vision", tags: ["embed", "search"], pricePer1k: 0.0020,
    latencyMs: 650, rating: 4.2, short: "High-quality embeddings for search/retrieval.",
  },
  {
    id: "m100", slug: "lens-restore-pro", name: "Lens-Restore-Pro", owner: "Cambria",
    category: "Vision", tags: ["restore", "pro"], pricePer1k: 0.0027,
    latencyMs: 820, rating: 4.3, short: "Pro restoration for film & archival photos.",
  },
  {
    id: "m101", slug: "lens-caption-lite", name: "Lens-Caption-Lite", owner: "Cambria",
    category: "Vision", tags: ["caption", "lite"], pricePer1k: 0.0018,
    latencyMs: 600, rating: 4.0, short: "Fast captions for ecommerce imagery.",
  },
  {
    id: "m102", slug: "echo-telephony", name: "Echo-Telephony", owner: "AudioWorks",
    category: "Audio", tags: ["asr", "telephony"], pricePer1k: 0.0017,
    latencyMs: 590, rating: 4.1, short: "ASR tuned for narrowband telephony audio.",
  },
  {
    id: "m103", slug: "echo-medical", name: "Echo-Medical", owner: "AudioWorks",
    category: "Audio", tags: ["asr", "medical"], pricePer1k: 0.0024,
    latencyMs: 710, rating: 4.3, short: "Medical dictation with terminology support.",
  },
  {
    id: "m104", slug: "sonic-align", name: "Sonic-Align", owner: "Lingua AI",
    category: "Audio", tags: ["align", "subtitle"], pricePer1k: 0.0016,
    latencyMs: 520, rating: 4.1, short: "Aligns transcripts to audio for subtitles.",
  },
  {
    id: "m105", slug: "pulse-narrator", name: "Pulse-Narrator", owner: "Lingua AI",
    category: "Audio", tags: ["tts", "narration"], pricePer1k: 0.0016,
    latencyMs: 540, rating: 4.2, short: "Warm narration voices for audiobooks.",
  },
  {
    id: "m106", slug: "router-costaware", name: "Router-CostAware", owner: "Sentient Labs",
    category: "Tooling", tags: ["router", "cost"], pricePer1k: 0.0007,
    latencyMs: 190, rating: 4.2, short: "Routes by quality/cost tradeoff in real time.",
  },
  {
    id: "m107", slug: "router-guarded", name: "Router-Guarded", owner: "Sentient Labs",
    category: "Tooling", tags: ["router", "safety"], pricePer1k: 0.0008,
    latencyMs: 210, rating: 4.3, short: "Applies safety checks to routed prompts.",
  },
  {
    id: "m108", slug: "judge-claimcheck", name: "Judge-ClaimCheck", owner: "EvalWorks",
    category: "Tooling", tags: ["eval", "claims"], pricePer1k: 0.0012,
    latencyMs: 320, rating: 4.2, short: "Checks claims for contradictions.",
  },
  {
    id: "m109", slug: "judge-citation", name: "Judge-Citation", owner: "EvalWorks",
    category: "Tooling", tags: ["eval", "citation"], pricePer1k: 0.0011,
    latencyMs: 300, rating: 4.1, short: "Scores correctness and citation structure.",
  },
  {
    id: "m110", slug: "shield-compliance", name: "Shield-Compliance", owner: "GuardAI",
    category: "Tooling", tags: ["compliance", "policy"], pricePer1k: 0.0013,
    latencyMs: 330, rating: 4.3, short: "Checks outputs against compliance rules.",
  },
  {
    id: "m111", slug: "shield-redteam", name: "Shield-RedTeam", owner: "GuardAI",
    category: "Tooling", tags: ["jailbreak", "stress"], pricePer1k: 0.0014,
    latencyMs: 360, rating: 4.2, short: "Adversarial probes for red-team testing.",
  },
  {
    id: "m112", slug: "aurora-coder", name: "Aurora-Coder", owner: "Sentient Labs",
    category: "LLM", tags: ["code", "assist"], pricePer1k: 0.0016,
    latencyMs: 560, rating: 4.3, short: "Code completions and inline docs.",
  },
  {
    id: "m113", slug: "aurora-draft", name: "Aurora-Draft", owner: "Sentient Labs",
    category: "LLM", tags: ["writing", "draft"], pricePer1k: 0.0011,
    latencyMs: 420, rating: 4.1, short: "Drafts emails and blog posts quickly.",
  },
  {
    id: "m114", slug: "nebula-finance", name: "Nebula-Finance", owner: "OpenStack AI",
    category: "LLM", tags: ["finance", "analysis"], pricePer1k: 0.0019,
    latencyMs: 640, rating: 4.3, short: "Financial analysis with structured outputs.",
  },
  {
    id: "m115", slug: "nebula-product", name: "Nebula-Product", owner: "OpenStack AI",
    category: "LLM", tags: ["product", "specs"], pricePer1k: 0.0015,
    latencyMs: 520, rating: 4.1, short: "Helps write product specs and PRDs.",
  },
  {
    id: "m116", slug: "vista-caption-pro", name: "Vista-Caption-Pro", owner: "Visionary",
    category: "Vision", tags: ["caption", "pro"], pricePer1k: 0.0025,
    latencyMs: 780, rating: 4.3, short: "High-quality captions for catalogs.",
  },
  {
    id: "m117", slug: "vista-search", name: "Vista-Search", owner: "Visionary",
    category: "Vision", tags: ["search", "embed"], pricePer1k: 0.0021,
    latencyMs: 700, rating: 4.2, short: "Image search via multimodal embeddings.",
  },
  {
    id: "m118", slug: "percept-qa", name: "Percept-QA", owner: "Percept Labs",
    category: "Vision", tags: ["qa", "image"], pricePer1k: 0.0020,
    latencyMs: 670, rating: 4.1, short: "Answers questions about uploaded images.",
  },
  {
    id: "m119", slug: "percept-compare", name: "Percept-Compare", owner: "Percept Labs",
    category: "Vision", tags: ["diff", "compare"], pricePer1k: 0.0019,
    latencyMs: 650, rating: 4.1, short: "Compares two images for differences.",
  },
  {
    id: "m120", slug: "lens-annotate", name: "Lens-Annotate", owner: "Cambria",
    category: "Vision", tags: ["annotate", "label"], pricePer1k: 0.0022,
    latencyMs: 740, rating: 4.2, short: "Auto-suggests annotations for labeling tools.",
  },
];