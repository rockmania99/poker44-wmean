# poker44-wmean

Poker44 (Bittensor netuid 126) bot-detection miner — model line **v29c**.

## Model
6 tree learners across three families (2x LightGBM + 2x XGBoost + HistGB + ExtraTrees, seed family 331) combined by an OOF-AP-weighted MEAN of member probabilities (no logistic meta), followed by a **raw-probability serving head** (rank-faithful; no fixed
positive fraction — scoring is rank-only and evaluation windows vary in
composition). No neural sequence model, no isotonic calibration.

## Training data (released/public only)
- Public benchmark releases (api.poker44.net `/api/v1/benchmark/chunks`, all
  sourceDates 2026-05-26 … 2026-07-06 **including the v2.2 expanded release**,
  groundTruth labels), with within-group subset augmentation and
  per-date-per-label pooled 80–105-hand chunks for live-size coverage.
- The canonical subnet repo's released human hands corpus
  (`hands_generator/human_hands/poker_hands_combined.json.gz`, 32k real human
  hands), chunked into session blocks at both size ranges.
- All hands sanitized via `prepare_hand_for_miner` (train == serve view).
- **No validator-private data.**

Trained weights are withheld (`models/` gitignored), reproducible via
`train_model.py` (VER=c) on the public data above.

## Serve
```
pm2 start ecosystem.config.js
```
Env: `POKER44_BUMP_MODEL=<repo>/models/model_v29c.joblib`, `POKER44_HEAD=raw`.
