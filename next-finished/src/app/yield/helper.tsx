import { Suspense } from "react";

const GeneratorComponent = async (props: {
  generator: AsyncGenerator<JSX.Element, JSX.Element, JSX.Element>;
}): Promise<JSX.Element> => {
  const { generator } = props;
  let result = await generator.next();
  if (result.done) {
    return result.value;
  }

  return (
    <Suspense fallback={result.value}>
      <GeneratorComponent generator={generator} />
    </Suspense>
  ) as any as JSX.Element;
};
export function generatorComponent<T>(
  fn: (props: T) => AsyncGenerator<JSX.Element, JSX.Element, JSX.Element>
): React.FC<T> {
  // eslint-disable-next-line react/display-name
  return (props: T) => {
    return <GeneratorComponent generator={fn(props)} />;
  };
}
