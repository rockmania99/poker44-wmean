// poker44-wmean: eros-03 (uid 92) serves v29c from its OWN repo.
// Raw-probability serving head (rank-only scoring; v2.2 eval varies windows).
module.exports = { apps: [{
  name: "poker44_eros03",
  script: "neurons/miner.py",
  interpreter: "/root/pocker44-miner/.venv/bin/python",
  cwd: "/root/poker44-e3",
  args: "--netuid 126 --wallet.name eros --wallet.hotkey eros-03 " +
        "--subtensor.network finney --axon.port 8098 " +
        "--blacklist.force_validator_permit --logging.info",
  env: {
    POKER44_BUMP_MODEL: "/root/poker44-e3/models/model_v29c.joblib",
    BT_NO_PARSE_CLI_ARGS: "0",
    POKER44_HEAD: "raw",
  },
  autorestart: true, max_restarts: 50, restart_delay: 5000,
}]};
