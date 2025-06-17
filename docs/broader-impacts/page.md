---
title: Computation and Society
nextjs:
  metadata:
    title: Computation and Society
    description: TBD.
---

## List of Risks
* **False positives** -- waste time, folks more likely to ignore flags in the future.
* **False negatives** -- can cause accidents.
* **Model drift** -- over time, models can become oversensitive to signals that aren't important / undersensitive to signals that are important.
* **Data poisoning** -- baseline data are intentionlly manipulated to corrupt the training process. Or, weird signals are intentionally generated to trigger a bunch of false positives and waste people's time. 
* **Misuse**
  * **Selective pattern tuning**: Even though the system is designed to detect “anomalies” without labels, operators can shape what counts as “normal” by controlling training data, sensor placement, or model thresholds. This means specific groups or behaviors can be highlighted as anomalous if their patterns differ from a constructed baseline.
  * **Feature targeting**: The system could be configured to focus on particular biometric or behavioral signals (gait, speech patterns, heart rate variability, social interactions) known to correlate with certain identities, activities, or demographic traits.

* **Emergent profiling**: Without explicit labels, unsupervised systems can still cluster data patterns that correlate with ethnicity, gender, or socioeconomic status, creating “implicit” profiling that’s hard to audit or contest.