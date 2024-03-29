import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { numRounds } = treatment;
  for (let i = 0; i < numRounds; i++) {
    const round = game.addRound({
      name: `Round ${i}`,
    });
    round.addStage({ name: "Advertisements", duration: 10000 });
    round.addStage({ name: "challenge", duration: 10000 });
    round.addStage({ name: "result", duration: 10000 });
  }
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {
  if (stage.get("name") !== "Advertisements") {
    return;
  }

  const players = stage.currentGame.players;

  for (const player of players) {
    const priceOfProduct = player.round.get("priceOfProduct");
    const productionCost = player.round.get("productionCost");
    const amountOfWarrant = player.round.get("amountOfWarrant") || 0;

    const score = player.get("score") || 0; // , adQuality, points, salesCount, numBuyers

    const min = 0;
    const max = 100;

    const numBuyers = Math.floor(Math.random() * (max - min) + min);
    const salesCount =
      numBuyers * (priceOfProduct - productionCost) - amountOfWarrant;

    player.round.set("numBuyers", numBuyers);
    player.round.set("salesCount", salesCount);
    console.log(salesCount);

    player.set("score", score + salesCount);
  }
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});
