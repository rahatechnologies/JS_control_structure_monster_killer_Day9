const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const ATTACK_MODE = 'ATTACK';
const STRONG_ATTACK_MODE = 'STRONG_ATTACK';
const HEAL_VALUE = 20;

let choseMaxLife = 100;

let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;

adjustHealthBars(choseMaxLife);

function endRound() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('Match Draw!');
  }
}

function attackMonster(mode) {
  let maxDamage;

  if (mode === ATTACK_MODE) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === STRONG_ATTACK_MODE) {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound(); // Damages to player
}

function attackHandler() {
  attackMonster(ATTACK_MODE);
}
function strongAttackHandler() {
  attackMonster(STRONG_ATTACK_MODE);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= choseMaxLife - HEAL_VALUE) {
    // currentPlayerHealth = 95
    // choseMaxLife = 100 Already delared as global variable
    //  HEAL_VALUE = 20  Already delared as global variable
    //   95 >= 100 - 20; which is not possible
    alert(`You can't heal to ore than your max initial health.`);
    healValue = choseMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }

  inrecasePlayerHealth(healValue); //UI update > changed Progress bar value for player health
  currentPlayerHealth += healValue;
  endRound(); // Damages to player
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
