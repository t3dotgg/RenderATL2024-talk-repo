import { generatorComponent } from "./helper";

async function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

const Steps = generatorComponent(async function* () {
  let i = 0;
  yield <h1>Step {++i}</h1>;
  await sleep(2000);
  yield <h1>Step {++i}</h1>;
  await sleep(2000);
  yield <h1>Step {++i}</h1>;
  await sleep(2000);
  return <h1>Step {++i}</h1>;
});

export default function YieldPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-2xl font-bold">
      <Steps />
    </div>
  );
}
