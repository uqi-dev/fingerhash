import FingerHash from "@/index";

const fingerhash = new FingerHash();

fingerhash.getFingerprint().then((fingerprint) => {
  console.log(fingerprint);
});

