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
  const [vibe, setVibe] = useState<VibeType>("Target role:");
  const [feature, setFeature] = useState<FeatureType>("Select the Feature");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const prompt = `Write two articles in the style of a ${vibe} clearly labeled "1." and "2.". Make sure the generated text is less than 500 words and base it on this context: ${bio}${
  //   bio.slice(-1) === "." ? "" : "."
  // }`;

  // const prompt = `Write 2 attention-grabbing LinkedIn ${feature}s for someone in the role of ${vibe} clearly labeled "1." and "2.". It should reflect their expertise, accomplishments, and the value they bring to target industry. Ensure it is creative and impactful, with a maximum of 220 characters and base it on this description: ${bio}${
  //   bio.slice(-1) === "." ? "" : "."
  // }`;

  const headline_prompt = `Act as a LinkedIn expert to enhance my LinkedIn presence. My goal is to attract recruiters and stand out in their search to land my target role of ${vibe}. Craft 2 creative and effective LinkedIn headlines with exactly 200 characters each clearly labeled "1." and "2." that incorporates relevant keywords and showcases my unique skills and experiences based on my bio: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const conn_prompt = `You are reaching out to connect with a professional on LinkedIn who holds the position: ${vibe} you aspire to. Your goal is to establish a meaningful connection with a conversational tone, write 2 personalized connection request messages with maximum of 250 characters each clearly labeled "1." and "2." that not only introduces yourself but also highlights why you're interested in connecting with them. You can reference their LinkedIn headline or experience description here: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  useEffect(() => {
    if (feature === "LinkedIn Headline") {
      setPrompt(headline_prompt);
    } else {
      setPrompt(conn_prompt);
    }
  }, [feature, bio, vibe]);

  const generateBio = async (e: any) => {
    e.preventDefault();

    if (feature === "Select the Feature") {
      toast("Please select the feature you want!", {
        icon: "🛑",
      });
      return;
    }
    if (vibe == "Target role:") {
      toast("Please select your target role!", {
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
    scrollToBios();
    setLoading(false);
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
          Supercharge Your LinkedIn <br />
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
          <div className="flex my-8 items-center space-x-3">
            <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select target role.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div>

          {/* description */}
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/2-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Description{" "}
              <span className="text-slate-500">
                (For Headline: Write about your skill set and experience | For
                Connection Request: Copy paste their headline)
              </span>
              .
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-500 shadow-md focus:border-black focus:ring-black my-5"
            placeholder={
              "Eg: Machine Learning enthusiast with 2+ years of experience in eCommerce."
            }
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
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
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
