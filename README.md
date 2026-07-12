# poker44-behavioral-trees-b

Miner implementation for Poker44 (Bittensor netuid 126) — chunk-level poker-bot
detection from behavioral hand statistics.

**Served model:** `v1.0-s7` — a weighted-mean probability blend of LightGBM,
HistGradientBoosting and ExtraTrees over ~147 behavioral features per chunk
(action entropy, bet-size quantization, self-similarity, n-gram statistics,
street rigidity, pot/bet dynamics), with isotonic calibration and a conformal
operating point. Scores are served through a batch-relative rank head
(`neurons/eros03_miner.py`), which preserves ranking while guaranteeing
threshold-sanity behavior on live traffic. Weights are this key's own training
run (seed 7).

**Training data:** released public training benchmark
(api.poker44.net/api/v1/benchmark, current source dates), projected through the
subnet's `prepare_hand_for_miner`. No validator-private evaluation data,
labels, or ground truth were used for training or calibration. Trained
artifacts and datasets are not distributed here.

## Layout
- `neurons/eros03_miner.py` — the served neuron (manifest `implementation_files`)
- `miner_model/` — feature extraction, model class, inference, trainers
- Requires the Poker44 subnet package (`pip install -e .` from Poker44/Poker44-subnet)

## Run
```
python neurons/eros03_miner.py --netuid 126 --wallet.name <cold> --wallet.hotkey <hot> --axon.port 8092
```
