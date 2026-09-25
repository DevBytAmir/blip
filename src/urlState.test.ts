import { encodeConfigToHash, decodeConfigFromHash } from "./urlState";
import { DEFAULT_CONFIG } from "./types";

test("round-trips a config through encode then decode", () => {
  const config = { ...DEFAULT_CONFIG, text: "HELLO", geometry: "spokes" as const };
  const hash = encodeConfigToHash(config);
  expect(decodeConfigFromHash(hash)).toEqual(config);
});

test("returns null for garbage input instead of throwing", () => {
  expect(() => decodeConfigFromHash("not-base64-!!!")).not.toThrow();
  expect(decodeConfigFromHash("not-base64-!!!")).toBeNull();
});

test("returns null for valid base64 that decodes to the wrong shape", () => {
  const badPayload = btoa(JSON.stringify({ foo: "bar" }));
  expect(decodeConfigFromHash(badPayload)).toBeNull();
});

test("returns null for a config with an invalid enum value", () => {
  const badConfig = { ...DEFAULT_CONFIG, geometry: "not-a-real-geometry" };
  const badPayload = btoa(JSON.stringify(badConfig));
  expect(decodeConfigFromHash(badPayload)).toBeNull();
});

test("round-trips a config with a custom solid background and gradient mark", () => {
  const config = {
    ...DEFAULT_CONFIG,
    customBackground: { type: "solid" as const, color: "#ff0000" },
    customMarkColor: {
      type: "gradient" as const,
      angle: 45,
      stops: [
        { offset: 0, color: "#000000" },
        { offset: 1, color: "#ffffff" },
      ],
    },
  };
  const hash = encodeConfigToHash(config);
  expect(decodeConfigFromHash(hash)).toEqual(config);
});

test("returns null for a custom fill with an invalid type", () => {
  const badConfig = { ...DEFAULT_CONFIG, customBackground: { type: "not-a-fill-type", color: "#fff" } };
  const badPayload = btoa(JSON.stringify(badConfig));
  expect(decodeConfigFromHash(badPayload)).toBeNull();
});
