---
title: Surveillance
nextjs:
  metadata:
    title: Surveillance
---

> ## Question1
> Is there a way to use these systems to intentionally surveil certain kinds of signatures? And could this have implications for civil liberties?


### Answer
Yes, absolutely — neuromorphic anomaly detection systems, especially those using unsupervised learning, can be intentionally tuned or adapted to surveil specific behavioral or physiological signatures. This capability raises profound civil liberties and ethical concerns.

### How it could happen

* **Selective pattern tuning**: Even though the system is designed to detect “anomalies” without labels, operators can shape what counts as “normal” by controlling training data, sensor placement, or model thresholds. This means specific groups or behaviors can be highlighted as anomalous if their patterns differ from a constructed baseline.
* **Feature targeting**: The system could be configured to focus on particular biometric or behavioral signals (gait, speech patterns, heart rate variability, social interactions) known to correlate with certain identities, activities, or demographic traits.
* **Emergent profiling**: Without explicit labels, unsupervised systems can still cluster data patterns that correlate with ethnicity, gender, or socioeconomic status, creating “implicit” profiling that’s hard to audit or contest.

### Implications for civil liberties
* **Privacy erosion**: Continuous, automated, and opaque surveillance could track individuals without consent or awareness, violating privacy rights.
* **Discrimination & bias**: If anomalous patterns align with marginalized or vulnerable groups (due to cultural behaviors, socioeconomic factors, or health conditions), the system could disproportionately surveil, restrict, or penalize them.
* **Lack of transparency & accountability**: Because these systems adapt dynamically and lack explicit labels, it’s difficult for individuals or regulators to understand, challenge, or correct wrongful surveillance or false accusations.
* **Chilling effects**: People may alter their behavior out of fear of being flagged as “anomalous,” reducing freedom of expression, assembly, or movement.


## Q: How can anomaly detection be triangulated with other systems to expand their reach?


## A: Example in Civil Surveillance
Imagine a smart city system:
* Anomaly detection flags “erratic pedestrian movement” on video.
* Face recognition identifies the person.
* A behavioral model compares with past patterns.
* A public safety AI consults legal/policy rules.
* A recommendation is made: do nothing, notify police, or dispatch help.

Each of these steps involves interfacing distinct AIs with different training objectives and modalities — triangulating the right action.

### Example: Palantir
* **Pro**: Integrates real-time sensor data with historical intelligence for faster, AI-aided situational awareness and decision-making (e.g., battlefield, public safety)
* **Con**: Centralized fusion of vast personal and sensor data can result in invasive surveillance and biased decisioning—particularly if edge-anomaly models misinterpret or over-police.

> Palantir Gotham is a data operating system built on ontologies and knowledge graphs, enhanced by live and edge-deployed AI. It surfaces anomalies and patterns, integrates them into a broader intelligence context, enables human-in-the-loop decisions, and continuously evolves through feedback—while also raising important civil liberties and transparency concerns.

## References
* [Palantir Gotham](https://www.nytimes.com/2025/05/30/technology/trump-palantir-data-americans.html)
* [More on Gotham](https://www.youtube.com/watch?v=uZi-nqrhID0)