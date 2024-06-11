export async function runWithRandomInterval(callback: () => void, randomInterval: number) {
   callback();

   console.time('runWithRandomInterval');

   setTimeout(() => {
      console.timeEnd('runWithRandomInterval');
      runWithRandomInterval(callback, randomInterval);
   }, randomInterval);
}
