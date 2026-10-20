import type { Block, Reference } from "./posts";

export const fixedCreditBlocks: Block[] = [
  {
    "type": "p",
    "text": "DeFi lending has frustrated me for years. The promise is simple: post collateral, borrow dollars in one transaction, at three in the morning, without asking anyone's permission. What nobody tells you is what happens to the rate after you click borrow."
  },
  {
    "type": "p",
    "text": "On a quiet day I can borrow USDC on a blue-chip platform for around 5%. That lasts until it doesn't. Right now, borrowing USDC on HyperCore costs around 10%, about double a quiet-day rate, and nothing is broken. It's simply what the rate model produces when enough people want dollars at the same time. Next month it could be 4%, or 15%."
  },
  {
    "type": "p",
    "text": "If you've borrowed on-chain, you know the routine. You watch the rate, redo the sums, and end up managing a position that was supposed to be a simple loan. Lenders sometimes catch an outlandish return (200% APY for a few hours), but that's a payment for being in the pool when liquidity ran out, and you can't plan around it."
  },
  {
    "type": "p",
    "text": "I've worked in consumer credit and lending in traditional finance for around five years. The customers I've worked with would never accept a rate that can move 10 percentage points or more while their money is out on loan, or while they owe it. A move of 1% already generates calls. On-chain, a swing ten times that is routine, and I think that's the main reason consumers and businesses haven't shown up."
  },
  {
    "type": "h2",
    "text": "Why the rate moves"
  },
  {
    "type": "p",
    "text": "Here's what's going on underneath. Most on-chain money markets set the rate from utilization, the share of a pool that is currently borrowed. The more that's out, the higher the rate. Above a target level (the \"kink\") the curve turns steep, so borrowers repay and new lenders arrive. On Aave's main USDC market on Ethereum the target is 92%, and between 92% and 100% the borrow rate climbs from about 4% to 14% [1]. HyperCore's native lending, launched in September with HYPE and BTC as collateral, also sets stablecoin rates by utilization [2][3]."
  },
  {
    "type": "p",
    "text": "That keeps the pool liquid, which is the point. The catch is that your rate now depends on what everyone else in the pool does tonight. Two cases from this year:"
  },
  {
    "type": "ul",
    "items": [
      "**One wallet.** In July, Talos found a single address pulling about $190M of USDC out of Aave every night and putting it back an hour later. Liquidity fell from around $210M to as little as $33K, pushing utilization past the kink each time. On a $1M loan that added about $3,280 a year, and roughly $6M a year across the market. The borrowers who paid it had done nothing [1].",
      "**A shock elsewhere.** After the April exploit of KelpDAO's rsETH, USDC on Aave v3's Ethereum Core market sat at 99.87% utilization for four days with under $3M available to withdraw, and the borrow rate was 14%. Some suppliers who couldn't withdraw borrowed stablecoins against their own deposits to get out [4]."
    ]
  },
  {
    "type": "p",
    "text": "Researchers saw the same pattern early. A 2020 study of Compound, Aave and dYdX found that realized rates cluster around the kink, and that liquidity is thin and concentrated in a few accounts [5]. The attempts at steadier rates fared no better. Aave disabled stable-rate borrowing during a security incident in November 2023 [6], and its v3.1 upgrade lets anyone move stable-rate debt onto the variable rate [7]."
  },
  {
    "type": "h2",
    "text": "The yields aren't real"
  },
  {
    "type": "p",
    "text": "A quoted yield describes one moment in a pool. It is today's rate at today's utilization, annualised, and nothing says it will last a week."
  },
  {
    "type": "p",
    "text": "The lender's side of the curve mirrors the borrower's. When a pool runs dry the supply rate shoots up, and when liquidity returns it falls back. In April, under the curve Circle proposed for Aave's USDC market, the supply rate at full utilization would have reached about 48%, in a pool where suppliers couldn't withdraw [4]. A number like that is the price of an emergency."
  },
  {
    "type": "p",
    "text": "Some pools add token incentives on top, which last as long as the budget does. Three platforms that are still live show what happens next:"
  },
  {
    "type": "ul",
    "items": [
      "**Ethena's staked USDe** offered more than 40% APY at its peak in 2024. It has compressed to around 3.5%, and deposits have fallen from a peak of about $11B to $3.6B [8].",
      "**Aave's** rates reached 20% in 2021 and 2022. Its USDC pool was paying about 2.61% in April 2026 [8].",
      "**Sky's savings rate** was 12.5% before it was cut to 8.75% in February 2025 [9]. In April 2026 it was 3.75% [8]."
    ]
  },
  {
    "type": "figure",
    "id": "yields-promised-vs-actual"
  },
  {
    "type": "p",
    "text": "These are the rates each platform showed at a given moment, and no single lender earned all of them. For comparison, Interactive Brokers was paying 3.14% on idle cash [8]. Over a year, what a lender earns depends on every day in between, and the headline figure covers only one of them."
  },
  {
    "type": "h2",
    "text": "The 7% app"
  },
  {
    "type": "p",
    "text": "Recently I came across a consumer iPhone app advertising about 7% APY on dollars. I won't name it and I can't see its books. When I work through what it would take to pay a rate like that, the list is short. The rate could be a pass-through of a floating DeFi yield that can fall at any time. It could be subsidized by incentives or a treasury that will eventually run out. Or it could involve leverage, rehypothecation or a single counterparty that never appears on the screen."
  },
  {
    "type": "p",
    "text": "If an app shows a flat 7% and doesn't say which applies, that is dishonest at the least and possibly predatory. The people least able to read the mechanics are the ones a polished consumer app is built to attract."
  },
  {
    "type": "p",
    "text": "The history is long. Terra's Anchor protocol offered about 20% on UST and at its peak held around $14B, roughly 74% of UST's circulating supply [10]. It needed a $450M injection to keep its yield reserve from running dry [11]. Celsius was still advertising up to 18.63% APY in July 2022, days before its bankruptcy [12]. BlockFi paid $100M to settle with the SEC and 32 states over its interest accounts [13]. In each case the number on the screen said little about the risk behind it."
  },
  {
    "type": "h2",
    "text": "What consumer credit already figured out"
  },
  {
    "type": "p",
    "text": "Traditional lending settled this long ago. People want a payment they can plan around. In the US, adjustable-rate mortgages have historically made up 5 to 10% of mortgage applications, according to the Urban Institute [14]. When a fixed rate is on offer, roughly nine in ten borrowers take it."
  },
  {
    "type": "p",
    "text": "Between early 2022 and July 2023 the Federal Reserve raised its policy rate from close to zero to a target range of 5.25 to 5.5% [15]. That took about 16 months of front-page coverage, and borrowers on fixed rates barely noticed. On-chain, a move of that size can happen in a day without a headline."
  },
  {
    "type": "p",
    "text": "Traditional finance also built enormous markets to turn floating rates into fixed ones. At the end of June 2025, OTC derivatives had $846 trillion in notional outstanding, and interest rate contracts were 79% of that [16]. The world pays a lot to manage rate risk, and DeFi has built very little of the equivalent."
  },
  {
    "type": "h2",
    "text": "What fixed credit looks like on-chain"
  },
  {
    "type": "p",
    "text": "The next step seems fairly clear to me. Price in the fluctuations, safeguard against the risk, and offer fixed-rate primitives and term trading, so on-chain debt markets can close the gap with the credit people already use. That breaks down into four parts."
  },
  {
    "type": "p",
    "text": "**Fixed-rate, fixed-term primitives.** A loan reads like a contract: borrow this much, repay that much, on this date. A deposit tells you what you'll hold at maturity. The structure resembles a zero-coupon bond and can be explained in a sentence."
  },
  {
    "type": "p",
    "text": "**Priced-in volatility.** Someone carries the risk that floating rates move, so the fixed rate includes a premium over today's floating rate, set openly the way a swap curve prices the expected path of rates. Recent research describes how to build fixed quotes on-chain by splitting a yield-bearing asset into principal and yield and pricing the future yield [17]. The premium is visible and agreed on day one."
  },
  {
    "type": "p",
    "text": "**Term trading.** A fixed-term position can be sold or refinanced before maturity at a market price. That produces a yield curve across 30, 90 and 180 days, and a fixed rate no longer means you're stuck."
  },
  {
    "type": "p",
    "text": "**Risk safeguards.** Fixed terms need a conservative system behind them. That means loan-to-value limits sized for the whole term, isolated markets so one asset's bad week stays contained, capital that takes the first loss ahead of depositors, and plain disclosure of what happens in a stress event. Nobody should be promised a guaranteed return. They should be told what they get and what could go wrong."
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
    "text": "Oliver Knight, \"The era of easy money in crypto is over as DeFi yields are failing to compete with a simple savings account\", CoinDesk, April 7, 2026.",
    "href": "https://www.coindesk.com/business/2026/04/07/defi-yields-are-crashing-so-hard-that-they-can-t-compete-with-a-traditional-savings-account"
  },
  {
    "text": "\"Sky governance vote raises savings rate to 8.75%\", Cryptopolitan, February 2025.",
    "href": "https://www.cryptopolitan.com/sky-governance-vote-raises-savings-rate-to-8-75/"
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
