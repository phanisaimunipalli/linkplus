import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import FeatureDropDown, { FeatureType } from "../components/FeatureDropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Home: NextPage = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [prompt, setPrompt] = useState<String>("");
  const [vibe, setVibe] = useState<string>(" ");
  const [feature, setFeature] = useState<FeatureType>(
    "How can I help you today?"
  );
  const [generatedBios, setGeneratedBios] = useState<String>("");
  const [dynamicMessage, setDynamicMessage] = useState("");
  const [language, setLanguage] = useState("English");

  const bioRef = useRef<null | HTMLDivElement>(null);
  const languages = ["English", "Spanish"];

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      // console.log("Scrolling to bioRef element"); // Debugging log
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const prompt = `Write two articles in the style of a ${vibe} clearly labeled "1." and "2.". Make sure the generated text is less than 500 words and base it on this context: ${bio}${
  //   bio.slice(-1) === "." ? "" : "."
  // }`;

  // const prompt = `Write 2 attention-grabbing LinkedIn ${feature}s for someone in the role of ${vibe} clearly labeled "1." and "2.". It should reflect their expertise, accomplishments, and the value they bring to target industry. Ensure it is creative and impactful, with a maximum of 220 characters and base it on this description: ${bio}${
  //   bio.slice(-1) === "." ? "" : "."
  // }`;

  const about_prompt = `You are the world's leading LinkedIn expert with decade of experience in capturing recruiters' attention, write LinkedIn About section in a narrative style, with a maximum of 2000 characters for targeting the role of ${vibe}. The About section should be authentic, reflect unique skills and experiences, and stand out to recruiters. Tailor the message by using the individual's background detailed in: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const headline_prompt = `You are the world's leading LinkedIn expert, create LinkedIn headline with 2 variants, each with exactly 200 characters each, for targeting the role of ${vibe}. The headlines should include relevant keywords to attract recruiters in the industry, reflect unique skills and experiences, and be crafted to stand out in recruiter searches. The headlines must be labeled '1.' and '2.' Tailore the message by using the individual's background detailed in ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const conn_prompt = `You are reaching out to connect with a professional on LinkedIn who holds the position: ${vibe} you aspire to. Your goal is to establish a meaningful connection with a conversational tone in less than 300 characters strictly, write 2 personalized connection request messages (without using hashtags) with maximum of 300 characters each clearly labeled "1." and "2." that not only introduces yourself but also highlights why you're interested in connecting with them. You can reference about my bio and their LinkedIn headline here: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const ref_prompt = `Generate two respectful and persuasive messages (clearly labeled '1.' and '2.', in less than 200 characters strictly each) to request a job referral at [company]. The message should start with a brief introduction, highlighting my skills match with target role: ${vibe}. Make it conversationa, spartan. Emphasize key achievements and value I will bring to the target position, using the information provided in ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const getCoffeePrompt = (vibe: string, bio: string, language: string) => {
    if (language === "Spanish") {
      console.log("language is selected: ", language);
      return `Generate two professional and courteous messages in ${language} language, maximum of 200 characters strictly, clearly labeled '1.' and '2.', to request a 15-minute coffee chat. The messages should reflect the requester's aspirations in ${vibe} and express a genuine interest in learning from a their experiences. They should be concise, polite, and clear in purpose, with a flexible tone to accommodate the recipient's schedule. Begin each message with a brief introduction of the requester, using details from ${bio}${
        bio.slice(-1) === "." ? "" : "."
      }`;
    }
    // Default to English
    return `Generate two professional and courteous messages, maximum of 200 characters strictly, clearly labeled '1.' and '2.', to request a 15-minute coffee chat. The messages should reflect the requester's aspirations in ${vibe} and express a genuine interest in learning from a their experiences. They should be concise, polite, and clear in purpose, with a flexible tone to accommodate the recipient's schedule. Begin each message with a brief introduction of the requester, using details from ${bio}${
      bio.slice(-1) === "." ? "" : "."
    }`;
  };

  // Similar functions for other prompts can be created here

  useEffect(() => {
    if (feature === "Generate Headline Based on my Skills") {
      setPrompt(headline_prompt);
      setDynamicMessage("Share about your experience & skillset.");
    } else if (feature === "Write a Personalzied DM for Networking") {
      setPrompt(conn_prompt);
      setDynamicMessage("My skills are...and their headline is...");
    } else if (feature === "Request for a Coffee-Chat") {
      setPrompt(getCoffeePrompt(vibe, bio, language));
      setDynamicMessage("Share about your interests or projects.");
    } else if (feature == "Send a DM requesting for Referral") {
      setPrompt(ref_prompt);
      setDynamicMessage("Share the value you will add to the position.");
    } else if (feature === "Write LinkedIn About Section") {
      setPrompt(about_prompt);
      setDynamicMessage(
        "Write about your skills, experience or what makes you stand out."
      );
    }
  }, [feature, bio, vibe]);

  const generateBio = async (e: any) => {
    e.preventDefault();

    if (feature === "How can I help you today?") {
      toast("How can I help you today?", {
        icon: "🛑",
      });
      return;
    }
    if (vibe == "Target role:") {
      toast("What's your target role?", {
        icon: "🛑",
      });
      return;
    }
    if (!bio) {
      toast("Please enter description!", {
        icon: "🛑",
      });
      return;
    }

    setGeneratedBios("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    setLoading(false);
    // console.log("Generated bios:", generatedBios); // Debugging log
    scrollToBios();
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>LinkPlus</title>
        <link rel="icon" href="/charge.png" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-2">
        {/* <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/phanisaimunipalli/linkplus"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a> */}
        {/* <h1 className="sm:text-6xl w-full text-4xl font-bold text-slate-900 mt-6">
          LinkPlus.
        </h1> */}
        <h1 className="sm:text-5xl w-full text-4xl font-bold text-slate-900 mt-5">
          10x Your LinkedIn with GPT-4o <br />
          in Seconds!
        </h1>

        {/* <p className="text-2xl text-slate-900 font-medium mt-10">
          LinkedIn Headline Generator
        </p> */}
        <p className="sm:text-4xl text-2xl text-slate-700 font-medium mt-10"></p>
        <div className="max-w-xl w-full">
          {/* Feature  - removed flex from this className*/}
          <div className="mb-5 items-center space-x-3">
            {/* <Image src="/1-black.png" width={30} height={30} alt="1 icon" /> */}
            {/* <p className="text-center font-medium">Select feature</p> */}
            <div className="block">
              <FeatureDropDown
                feature={feature}
                setFeature={(newFeature) => setFeature(newFeature)}
              />
            </div>
          </div>

          {/* Target role */}
          {/* <div className="flex my-8 items-center space-x-3">
            <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select target role.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div> */}
          <div className="flex my-8 items-center space-x-2">
            <Image src="/1-black.png" width={20} height={20} alt="1 icon" />
            <p className="text-left font-medium">What's your target role?</p>
          </div>
          <div className="block">
            <input
              type="text"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="w-full rounded-md border-gray-500 shadow-md focus:border-black focus:ring-black my-5"
              placeholder="Eg: Full Stack Software Engineer"
            />
          </div>

          {/* description */}
          <div className="flex mt-10 items-center space-x-2">
            <Image
              src="/2-black.png"
              width={20}
              height={20}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Description{" "}
              {/* <span className="text-slate-500">
                (For Headline: Write about your skill set and experience | For
                Connection Request: Copy paste their headline)
              </span> */}
              <br />
              <span className="text-slate-500">{dynamicMessage}</span>
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-500 shadow-md focus:border-black focus:ring-black my-5"
            placeholder={""}
            required
          />

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-bold px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Create now &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 3000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div ref={bioRef}>
                <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                  Boost Your LinkedIn Presence!
                </h2>
              </div>
              <div className="space-y-8 whitespace-pre-wrap flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split("2.")
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
