---
title: Risk Frameworks
nextjs:
  metadata:
    title: Risk Frameworks
    description: TBD.
---

Framework for Ethical, Legal, and Societal Implications (ELSI) of Neuromorphic Anomaly Detection Chips

## 1. Accountability and Oversight

### Risks
- False positives or missed detections could have significant consequences
- Autonomy may reduce visibility into who is responsible for system decisions
- Lack of mechanisms for auditing or challenging outcomes

### Relevant Guidelines
- *EU AI Act*: Requires human oversight for high-risk systems  
- *NIST AI Risk Management Framework*: Emphasizes governance and clearly defined roles

{% callout title="Questions to Answer" %}
- Who is accountable when the system fails?
- Are decision-making processes auditable and documented?
- Is human oversight built in, and is it meaningful?
{% /callout %}

## 2. Bias and Fairness

### Risks
- Limited training data may embed structural bias
- Underrepresented environments may be flagged as anomalous
- False positives may disproportionately affect vulnerable populations

### Relevant Guidelines
- *NIST AI Risk Management Framework*: Recommends fairness and harm assessment across lifecycle  
- *IEEE Ethically Aligned Design*: Calls for inclusive and stakeholder-aware systems

{% callout title="Questions to Answer" %}
- Were diverse contexts and populations represented in training data?
- Are false positive/negative rates consistent across groups?
- Is fairness regularly tested and monitored?
{% /callout %}

## 3. Explainability and Transparency

### Risks
- Spiking neural networks can be opaque to developers and users
- Difficulty explaining why an anomaly was flagged or ignored
- End-users may not understand system behavior

### Relevant Guidelines
- *EU AI Act*: Requires intelligibility and traceability for high-risk systems  
- *NIST AI Risk Management Framework*: Promotes interpretability and transparency throughout the lifecycle

{% callout title="Questions to Answer" %}
- Can system logic and outputs be explained in human terms?
- Are spike patterns and update rules documented?
- Can stakeholders interrogate or challenge decisions?
{% /callout %}

## 4. Misuse and Security

### Risks
- System may be repurposed for surveillance, profiling, or coercive applications
- Susceptible to adversarial attacks (e.g., spoofing normal patterns)
- Lack of safeguards could result in unsafe or unintended behavior

### Relevant Guidelines
- *NIST AI Risk Management Framework*: Supports security testing and red-teaming  
- *IEEE Ethically Aligned Design*: Encourages anticipation of unintended or malicious uses

{% callout title="Questions to Answer" %}
- What are the plausible misuse scenarios?
- Can the system be spoofed, subverted, or tampered with?
- Are safeguards or override mechanisms in place?
{% /callout %}


## 5. Data Privacy

### Risks
- Spike patterns may encode sensitive behavioral or biometric information
- Users may be unaware of what data is processed, inferred, or stored
- Risk of re-identification from system outputs

### Relevant Guidelines
- *EU AI Act & GDPR*: Require privacy by design and data minimization  
- *NIST AI Risk Management Framework*: Emphasizes secure data handling and user rights  
- *OECD AI Principles*: Promote transparency and informed consent

{% callout title="Questions to Answer" %}
- What types of data are processed (even transiently)?
- Are data flows documented and accessible to users?
- Is there a mechanism for user consent, access, and control?
{% /callout %}

## 6. Environmental Impacts

### Risks
- Manufacturing neuromorphic hardware may involve rare-earth materials or energy-intensive fabrication
- Energy efficiency claims may overlook full lifecycle costs (e.g., training, disposal)
- Widespread deployment could increase e-waste

### Relevant Guidelines
- *IEEE Ethically Aligned Design*: Recommends sustainability assessments for emerging technologies  
- *OECD & UN Sustainable Development Goals*: Emphasize lifecycle impacts and responsible production

{% callout title="Questions to Answer" %}
- What is the energy and material footprint of the hardware?
- How does the lifecycle (manufacturing, operation, disposal) compare to alternatives?
- Are there plans for recycling, reuse, or energy benchmarking?
{% /callout %}

## 7. Neuromorphic-Specific Considerations

### Risks
- Hardware-based learning is difficult to inspect or update; spiking behavior may not be easily interpretable
- Lack of logging and centralized control limits oversight
- Bio data is particularly sensitive

### Relevant Guidelines
- General guidelines (NIST, IEEE) apply, but additional attention is needed for hardware-level opacity and post-deployment immutability

{% callout title="Questions to Answer" %}
- Is learning behavior traceable once deployed?
- Can the chip be safely updated or patched?
- Are diagnostics and logs available for post-hoc analysis?
{% /callout %}

## References
### NIST AI Risk Management Framework (AI RMF)

The official framework from the U.S. National Institute of Standards and Technology (NIST), released in January 2023, provides an "optional" approach for identifying and managing AI risks. It defines four key functions (**Map, Measure, Manage, and Govern**) and emphasizes trustworthiness attributes like transparency, accountability, and fairness.

{% raw %}
<a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener noreferrer">NIST AI RMF Official Site</a>
{% /raw %}

---

### EU Artificial Intelligence Act (AI Act)

The **EU AI Act** (Regulation (EU) 2024/1689) is the world's first comprehensive AI law. It classifies AI systems by risk level, mandates human oversight for high-risk systems, and requires transparency, documentation, and robustness.

{% raw %}
<a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689" target="_blank" rel="noopener noreferrer">EU AI Act Text (EUR-Lex)</a>
{% /raw %}

Note the list of banned AI applications:
| Banned AI Activity                           | Why?                                            |
| -------------------------------------------- | ----------------------------------------------- |
| Manipulative AI that causes harm             | Protects physical & psychological safety        |
| Public social scoring                        | Prevents discrimination & unfair treatment      |
| Real-time biometric ID in public (generally) | Safeguards privacy & prevents mass surveillance |
| Exploiting vulnerable groups                 | Prevents abuse and harm                         |
| Subliminal or deceptive AI causing harm      | Protects users from manipulation                |



### General Data Protection Regulation (GDPR)
The **General Data Protection Regulation (GDPR)** governs how personal data is collected, processed, and stored within the EU, emphasizing consent, data minimization, and individual rights.

{% raw %}
<a href="https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en" target="_blank" rel="noopener noreferrer">GDPR Overview (EU Commission)</a>
{% /raw %}


### OECD AI Principles

Adopted in May 2019, these principles guide the design and deployment of trustworthy AI. They emphasize human-centered values, transparency, accountability, robustness, and sustainability.

{% raw %}
<a href="https://oecd.ai/en/ai-principles" target="_blank" rel="noopener noreferrer">OECD AI Principles</a>
{% /raw %}


### IEEE Ethically Aligned Design (EAD)

Published by the IEEE Global Initiative on Ethics of Autonomous and Intelligent Systems, this document outlines ethical design principles for AI and autonomous systems, including transparency, human rights, and accountability.

{% raw %}
<a href="https://ethicsinaction.ieee.org/" target="_blank" rel="noopener noreferrer">Ethically Aligned Design, Version 2 (IEEE)</a>
{% /raw %}


### OECD & UN Sustainable Development Goals (SDGs)

The **United Nations Sustainable Development Goals (SDGs)** provide a global blueprint for sustainability. AI technologies, including neuromorphic hardware, can impact goals like responsible consumption, climate action, and innovation.

{% raw %}
<a href="https://sdgs.un.org/goals" target="_blank" rel="noopener noreferrer">UN Sustainable Development Goals Overview</a>  
<a href="https://www.oecd.org/digital/ai/ai-sdgs/" target="_blank" rel="noopener noreferrer">OECD AI and the Sustainable Development Goals</a>
{% /raw %}



---

## Other Notes

* **Model drift** -- over time, models can become oversensitive to signals that aren't important / undersensitive to signals that are important.
* **Data poisoning** -- baseline data are intentionlly manipulated to corrupt the training process. Or, weird signals are intentionally generated to trigger a bunch of false positives and waste people's time. 
* **Misuse**
  * **Selective pattern tuning**: Even though the system is designed to detect "anomalies" without labels, operators can shape what counts as "normal" by controlling training data, sensor placement, or model thresholds. This means specific groups or behaviors can be highlighted as anomalous if their patterns differ from a constructed baseline.
  * **Feature targeting**: The system could be configured to focus on particular biometric or behavioral signals (gait, speech patterns, heart rate variability, social interactions) known to correlate with certain identities, activities, or demographic traits.
  * **Emergent profiling**: Without explicit labels, unsupervised systems can still cluster data patterns that correlate with ethnicity, gender, or socioeconomic status, creating "implicit" profiling that's hard to audit or contest.


## Anomaly Detection Risks by Domain
  
  | **Domain**                   | **Anomaly Detection Use**                             | **Societal Risks**                                                | **Examples**                                   |
| ---------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------- |
| **Finance**               | Fraud or suspicious transaction detection             | False positives lock out vulnerable users; opaque decision-making | Refugee blocked from using funds               |
| **Policing**              | Predictive policing; unusual behavior spotting        | Reinforces racial bias, surveillance creep, algorithmic redlining | Overpolicing based on “anomalous” presence     |
| **Healthcare**            | Irregular ECG/vitals, wearable alerts                 | Alarm fatigue; false negatives for minority groups                | Missed arrhythmia in underrepresented patients |
| **Work Monitoring**       | Unusual work patterns (breaks, typing, usage)         | Erodes worker autonomy; used to justify firing                    | Worker flagged for “inactivity” during illness |
| **Online Platforms** | Detecting bots, cheating, abuse                       | Neurodivergent users wrongly flagged; no appeal process           | Student with slow typing marked as cheater     |
| **Border/Immigration**    | Travel pattern or behavior anomaly detection          | Detention based on cultural or trauma-based behavior differences  | Asylum seeker flagged for “suspicious” posture |
| **Mental Health**         | Behavioral shifts detected via wearables/web activity | Privacy violation; stigma from misunderstood patterns             | Depression risk algorithm used by insurers     |


## Case Studies: Real-World Harms from Anomaly Detection False Positives

### 2011 — ICU Alarm Fatigue Highlighted
- **Event**: The Joint Commission classifies alarm fatigue as a critical patient safety issue.
- **System**: Anomaly detection in vital signs triggers constant alarms.
- **Harm**: 85–95% of alarms are false → nurses miss actual medical emergencies.
- **Link**: [The Joint Commission](https://www.jointcommission.org/resources/patient-safety-topics/sentinel-event/)

---

### 2015–2019 — Robodebt Scandal (Australia)
- **Event**: Welfare recipients falsely accused of fraud via automated income anomaly detection.
- **System**: Compared tax records to welfare data using simple heuristics.
- **Harm**: Thousands issued unlawful debt notices; some suicides linked to stress.
- **Link**: [ABC News Report](https://www.abc.net.au/news/2023-07-07/robodebt-royal-commission-report-key-findings/102571938)

---

### 2018 — Student Banned by Proctoring AI
- **Event**: Online test-taker flagged by automated proctoring for “suspicious movement.”
- **System**: Anomaly detection on webcam, eye movement, and audio.
- **Harm**: Student falsely accused of cheating, appeal process unclear.
- **Link**: [NY Times](https://www.nytimes.com/2020/05/10/us/online-testing-cheating-universities-coronavirus.html)

---

### 2020 — Robert Williams Wrongfully Arrested (Detroit, USA)
- **Event**: First known U.S. wrongful arrest due to facial recognition.
- **System**: Facial anomaly match on blurry security footage.
- **Harm**: Arrest and detainment of innocent Black man.
- **Link**: [ACLU Case Summary](https://www.aclu.org/news/privacy-technology/the-police-wrongly-arrested-me-because-of-facial-recognition)

---

### 2020–2021 — Pandemic Fraud Detection Failures (USA)
- **Event**: State systems flag unemployment claims as fraudulent via anomaly detection.
- **System**: Automated detection of “unusual” applications during COVID-19 crisis.
- **Harm**: Tens of thousands denied benefits; some evicted or left without food.
- **Link**: [The Guardian](https://www.theguardian.com/us-news/2021/aug/11/michigan-unemployment-benefits-algorithm)

---

### 2021 — AI Suicide Risk Tool Causes Panic
- **Event**: Behavioral health system uses AI to predict suicide risk in teens.
- **System**: Anomaly detection on mood, messages, and usage.
- **Harm**: False positives lead to emergency police checks and trauma.
- **Link**: [Stat News](https://www.statnews.com/2021/04/06/mental-health-apps-ai-suicide-prediction/)

---

### Ongoing — TSA & DHS No Fly List Errors
- **Event**: Travelers wrongly placed on watchlists for “suspicious behavior.”
- **System**: Behavior-based anomaly scoring at airports.
- **Harm**: Journalists, veterans, and children blocked from flying, often with no explanation or appeal.
- **Link**: [ACLU No Fly Lawsuit](https://www.aclu.org/cases/gulet-mohamud-v-eric-holder-challenging-no-fly-list)

