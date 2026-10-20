import type { Block, Reference } from "./posts";

export const fixedCreditBlocks: Block[] = [
  {
    "type": "p",
    "text": "DeFi lending has frustrated me for years. The technology is good. You can post collateral and borrow dollars in one transaction, at three in the morning, without asking anyone's permission. The frustration starts after you click borrow."
  },
  {
    "type": "p",
    "text": "When I borrow USDC on a blue-chip platform on a quiet day, the rate might be around 5%. That lasts until it doesn't. Right now, borrowing USDC on HyperCore costs around 10%, about double what I'd call a quiet-day rate, and nothing is broken. Nobody was hacked and no market crashed. It's simply what the rate model produces when enough people want dollars at the same time. Next month it could be 4%, or 15%."
  },
  {
    "type": "p",
    "text": "Anyone who has borrowed on-chain knows this. You watch the rate, you do the sums again, and you end up managing a position that was supposed to be a loan. As a lender you sometimes catch an outlandish return (200% APY for a few hours), which is a payment for being in the pool when liquidity ran out. Nobody can build a plan on it."
  },
  {
    "type": "p",
    "text": "I worked in consumer credit and lending in traditional finance for around five years. The customers I dealt with would never accept a rate that can move 10 percentage points or more while their money is out on loan, or while they owe it. A move of 1% would already generate calls. On-chain, a swing of ten times that is routine, and I think it is the main reason consumers and businesses haven't shown up."
  },
  {
    "type": "h2",
    "text": "How the swings happen"
  },
  {
    "type": "p",
    "text": "Most on-chain money markets price a loan by utilization, the share of the pool that is currently borrowed. The more of it that's out, the higher the rate. Past a target level (the \"kink\") the curve turns steep so that borrowers repay and new lenders arrive. On Aave's main USDC market on Ethereum the target is 92%, and between 92% and 100% utilization the borrow rate climbs from about 4% to 14% [1]. HyperCore's native lending, which launched in September with HYPE and BTC as collateral, also sets stablecoin rates by utilization [2][3]."
  },
  {
    "type": "p",
    "text": "The model works at keeping a pool liquid. The side effect is that your rate depends on what everyone else in the pool is doing tonight. Two cases from this year show how ordinary that is:"
  },
  {
    "type": "ul",
    "items": [
      "**One wallet.** In July, Talos found a single address pulling roughly $190M of USDC out of Aave every night and putting it back about an hour later. Available liquidity dropped from around $210M to as little as $33K, which pushed utilization past the kink each time. On a $1M loan that added about $3,280 a year, and across the market roughly $6M a year [1]. The borrowers who paid it had done nothing.",
      "**A shock elsewhere.** After the April exploit of KelpDAO's rsETH, USDC on Aave v3's Ethereum Core market sat at 99.87% utilization for four days with under $3M available to withdraw. The borrow rate was 14%. Circle's chief economist proposed raising the curve's upper slope to 50%, which would let the supply rate reach about 48%. Some suppliers who couldn't withdraw borrowed stablecoins against their own deposits to get out [4]."
    ]
  },
  {
    "type": "p",
    "text": "Researchers saw the same pattern early. A 2020 study of Compound, Aave and dYdX from Imperial College London found that realized rates cluster around the kink, that liquidity is thin and held by a few accounts, and that rates across venues don't line up the way a no-arbitrage model predicts [5]. The platforms that tried to offer something steadier ran into trouble as well. Aave disabled its stable-rate borrowing during a security incident in November 2023 [6], and its v3.1 upgrade added a function that lets anyone move stable-rate debt onto the variable rate [7]."
  },
  {
    "type": "h2",
    "text": "The yields aren't real"
  },
  {
    "type": "p",
    "text": "A quoted yield describes one moment in a pool. It is the rate at today's utilization, annualised, and nothing guarantees it will last a week. On the lender's side the curve mirrors the borrower's: when a pool runs dry the supply rate shoots up, and when liquidity returns it falls back. In April, under the curve Circle proposed for Aave's USDC market, the supply rate at full utilization would have reached about 48%, in a pool where suppliers couldn't withdraw [4]. A number like that on a screen is the price of an emergency. Some pools add token incentives on top, which last as long as the budget does. Over a year, what a lender actually earns depends on every day in between, and the headline figure covers only one of them."
  },
  {
    "type": "h2",
    "text": "The 7% app"
  },
  {
    "type": "p",
    "text": "Recently I came across a consumer iPhone app advertising about 7% APY on dollars. I won't name it and I can't see its books. When I tear down what it would take to pay a rate like that, I find a short list of possibilities. The rate could be a pass-through of a floating DeFi yield that can fall at any time. It could be subsidized by incentives or a treasury that will eventually run out. It could involve leverage, rehypothecation or a single counterparty that never appears on the screen."
  },
  {
    "type": "p",
    "text": "If an app shows a flat 7% and doesn't say which of those applies, I'd call that dishonest at the least and possibly predatory, because the people least able to read the mechanics are the ones a polished consumer app is built to attract."
  },
  {
    "type": "p",
    "text": "The history here is long. Terra's Anchor protocol offered depositors about 20% on UST and at its peak held around $14B, roughly 74% of UST's circulating supply [8]. It needed a $450M injection to keep its yield reserve from running dry [9]. Celsius was still advertising up to 18.63% APY in July 2022, days before its bankruptcy [10]. BlockFi paid $100M to settle with the SEC and 32 states over its interest accounts [11]. In every case the number on the screen said very little about the risk behind it."
  },
  {
    "type": "h2",
    "text": "What consumer credit already figured out"
  },
  {
    "type": "p",
    "text": "Traditional lending dealt with this long ago. People want a payment they can plan around. In the US, adjustable-rate mortgages have historically made up 5 to 10% of mortgage applications, according to the Urban Institute's housing finance chartbook [12]. When a fixed rate is on offer, more than nine in ten borrowers take it."
  },
  {
    "type": "p",
    "text": "Between early 2022 and July 2023 the Federal Reserve raised its policy rate from close to zero to a target range of 5.25 to 5.5% [13]. That took about 16 months of front-page coverage, and borrowers on fixed rates barely noticed. On-chain, a move of similar size can happen in a day, usually without a headline."
  },
  {
    "type": "p",
    "text": "Traditional finance also built enormous markets just to convert floating rates into fixed ones. At the end of June 2025, OTC derivatives had $846 trillion in notional outstanding and interest rate contracts were 79% of that, according to the Bank for International Settlements [14]. The world pays a lot to manage rate risk, and DeFi has built very little of the equivalent."
  },
  {
    "type": "h2",
    "text": "What fixed credit looks like on-chain"
  },
  {
    "type": "p",
    "text": "The next step seems fairly clear to me. Price in the fluctuations, safeguard against the risk, and offer fixed-rate primitives and term trading so on-chain debt markets can close the gap with the credit people already use. That breaks down into four parts."
  },
  {
    "type": "p",
    "text": "**Fixed-rate, fixed-term primitives.** A loan reads like a contract: borrow this much, repay that much, on this date. A deposit tells you what you'll hold at maturity. The structure resembles a zero-coupon bond and can be explained in a sentence."
  },
  {
    "type": "p",
    "text": "**Priced-in volatility.** Someone carries the risk that floating rates move, so the fixed rate includes a premium over today's floating rate, set openly, the way a swap curve prices the expected path of rates. Recent research describes how fixed quotes can be built on-chain by splitting a yield-bearing asset into principal and yield and pricing the future yield [15]. The premium is visible and agreed on day one."
  },
  {
    "type": "p",
    "text": "**Term trading.** A fixed-term position can be sold or refinanced before maturity at a market price. That produces a yield curve across 30, 90 and 180 days, and a fixed rate no longer means you're stuck."
  },
  {
    "type": "p",
    "text": "**Risk safeguards.** Fixed terms need a conservative system behind them: loan-to-value limits sized for the whole term, isolated markets so one asset's bad week stays contained, capital that takes the first loss ahead of depositors, and plain disclosure of what happens in a stress event. Nobody should be promised a guaranteed return. They should be told what they get and what could go wrong."
  },
  {
    "type": "h2",
    "text": "Who benefits"
  },
  {
    "type": "p",
    "text": "**Consumers** get a payment they can budget for and a yield they can believe. Working out what a loan costs this month shouldn't require a utilization chart. A quoted rate is the rate they get, with the risks written next to it."
  },
  {
    "type": "p",
    "text": "**Businesses** get to plan. A company holding stablecoins, a market maker financing inventory for 90 days, or a firm borrowing against crypto on its balance sheet each needs the cost of money to line up with what it earns. A CFO can't sign off on a funding cost that could double or triple before the end of the quarter. With fixed terms, on-chain credit becomes something a treasury can use."
  },
  {
    "type": "p",
    "text": "**The market** gets patient capital. The deep liquidity behind traditional credit comes from lenders who want predictability. Fixed terms give them a reason to stay."
  },
  {
    "type": "p",
    "text": "There is a cost. On a calm day a fixed rate will usually come in above the floating one. That premium is what the certainty costs, and in traditional finance most people pay it without thinking."
  },
  {
    "type": "p",
    "text": "DeFi built the floating-rate market first, and it does its job well. The next piece is a market where the rate you see at the start is the rate you pay until maturity."
  }
];

export const fixedCreditReferences: Reference[] = [
  {
    "text": "Cooper Duschang, \"Why is Aave's USDC Utilization Rate Spiking?\", Talos, July 28, 2026.",
    "href": "https://www.talos.com/insights/why-is-aaves-usdc-utilization-rate-spiking"
  },
  {
    "text": "\"Hyperliquid Opens Native Lending as HYPE Hits New ATH Above $90\", CryptoSlate, September 2026.",
    "href": "https://cryptoslate.com/hyperliquid-opens-native-lending-as-hype-hits-new-ath-above-90/"
  },
  {
    "text": "\"Hyperliquid Launches USDC and USDT Manual Borrows Against HYPE & Bitcoin\", CoinGape, September 18, 2026.",
    "href": "https://coingape.com/hyperliquid-launches-usdc-and-usdt-manual-borrows-against-hype-bitcoin/"
  },
  {
    "text": "\"Circle Proposes Aave Rate Overhaul to Fix USDC Liquidity Crisis\", Yahoo Finance, April 22, 2026.",
    "href": "https://finance.yahoo.com/markets/crypto/articles/circle-proposes-aave-rate-overhaul-185024743.html"
  },
  {
    "text": "Lewis Gudgeon, Sam M. Werner, Daniel Perez and William J. Knottenbelt, \"DeFi Protocols for Loanable Funds: Interest Rates, Liquidity and Market Efficiency\", Imperial College London, 2020.",
    "href": "https://arxiv.org/abs/2006.13922"
  },
  {
    "text": "\"Aave V3 markets resume normal operations after security scare\", The Block, November 2023.",
    "href": "https://www.theblock.co/post/262757/aave-v3-markets-resume-normal-operations-after-security-scare"
  },
  {
    "text": "BGD Labs, \"Aave v3.1 and Aave Origin\", Aave governance forum, April 9, 2024.",
    "href": "https://governance.aave.com/t/bgd-aave-v3-1-and-aave-origin/17305"
  },
  {
    "text": "Rafael Cosman, \"The Real Force Behind UST's Collapse: Unsustainable Anchor Yields\", Nasdaq, August 12, 2022.",
    "href": "https://www.nasdaq.com/articles/the-real-force-behind-usts-collapse:-unsustainable-anchor-yields"
  },
  {
    "text": "\"Terra injects $450M UST into Anchor reserve days before protocol depletion\", Cointelegraph, 2022.",
    "href": "https://cointelegraph.com/news/terra-injects-450m-ust-into-anchor-reserve-days-before-protocol-depletion"
  },
  {
    "text": "\"From $25 billion to $167 million: How a major crypto lender collapsed and dragged many investors down with it\", CNBC, July 17, 2022.",
    "href": "https://www.cnbc.com/2022/07/17/how-the-fall-of-celsius-dragged-down-crypto-investors.html"
  },
  {
    "text": "\"BlockFi to Pay $100 Million to Settle with SEC and 32 States Over Crypto Lending Business\", Paul, Weiss, February 2022.",
    "href": "https://www.paulweiss.com/insights/client-memos/blockfi-to-pay-100-million-to-settle-with-sec-and-32-states-over-crypto-lending-business"
  },
  {
    "text": "Urban Institute, \"Housing Finance at a Glance: A Monthly Chartbook\", September 2026 (Adjustable-Rate Mortgage Share of Applications).",
    "href": "https://www.urban.org/sites/default/files/2026-09/Housing_Finance_at_a_Glance_A_Monthly_Chartbook_September_2026.pdf"
  },
  {
    "text": "Board of Governors of the Federal Reserve System, FOMC statement, July 26, 2023.",
    "href": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20230726a.htm"
  },
  {
    "text": "Bank for International Settlements, \"OTC derivatives statistics at end-June 2025\", December 2025.",
    "href": "https://www.bis.org/publ/otc_hy2512.htm"
  },
  {
    "text": "Viraj Nadkarni and Pramod Viswanath, \"Split the Yield, Share the Risk: Pricing, Hedging and Fixed rates in DeFi\", arXiv:2505.22784.",
    "href": "https://arxiv.org/abs/2505.22784"
  }
];
