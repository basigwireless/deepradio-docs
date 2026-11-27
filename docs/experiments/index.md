# Experiments

Step-by-step lab experiments for Deep Radio, from the **Deep Radio Experiments Manual** by Dr. Prabhu Chandhar. Each experiment gives the aim, the procedure and a description of what you should observe.

!!! tip "Before you start"
    Most experiments start from the **WiGuy Launcher**: open a terminal and run `startWiGuy`. Abbreviations are listed in the [List of Abbreviations](../reference/abbreviations.md).

## All experiments

| No. | Experiment | Aim |
|---|---|---|
| 1 | [Using the Embedded Python Block in GNU Radio Companion](exp01-using-the-embedded-python-block-in-gnu-radio-companion.md) | Create a custom signal processing block in Python using the Embedded Python Block in GNU Radio Companion, and to use it to add or multiply two signals. |
| 2 | [Time-Frequency Analysis using Inspectrum](exp02-time-frequency-analysis-using-inspectrum.md) | Study and analyse recorded RF signals using the Inspectrum signal visualisation tool. |
| 3 | [Spectrum Analysis using GQRX](exp03-spectrum-analysis-using-gqrx.md) | Perform real-time spectrum monitoring and signal analysis using the GQRX SDR receiver available in the WiGuy platform. |
| 4 | [FIR Filter Design and Analysis](exp04-fir-filter-design-and-analysis.md) | Design and analyse Finite Impulse Response (FIR) filters for RF signal processing using the FIR Filter Analyzer in the WiGuy platform. |
| 5 | [FM Demodulation](exp05-fm-demodulation.md) | Receive and demodulate an FM signal using the RTL-SDR and analyse the recovered audio with the FM Demodulator tool in the WiGuy platform. |
| 6 | [Live Channel Prediction using Machine Learning](exp06-live-channel-prediction-using-machine-learning.md) | Predict the wireless channel in real time using machine learning on live RTL-SDR signal captures. |
| 7 | [ON/OFF Activity Prediction using Machine Learning](exp07-on-off-activity-prediction-using-machine-learning.md) | Detect and predict ON/OFF channel activity using machine learning models (LSTM, CNN and SVM) in the WiGuy platform. |
| 8 | [QPSK Transmission, Reception and BER Analysis](exp08-qpsk-transmission-reception-and-ber-analysis.md) | Transmit and receive QPSK-modulated signals, observe the decoded data and analyse the Bit Error Rate (BER) using the QPSK Receiver tool in the WiGuy platform. |
| 9 | [BPSK Transmission and Reception (Live Text)](exp09-bpsk-transmission-and-reception-live-text.md) | Transmit text messages live over a BPSK link and decode them at the receiver. |
| 10 | [AM Transmission and Reception](exp10-am-transmission-and-reception.md) | Transmit an audio file using Amplitude Modulation (AM) and receive it with GQRX. |
| 11 | [FM Transmission and Reception](exp11-fm-transmission-and-reception.md) | Transmit an audio file using Frequency Modulation (FM) and receive it with GQRX. |
| 12 | [5G Signal Generation and Transmission](exp12-5g-signal-generation-and-transmission.md) | Generate 5G NR IQ signals, analyse them with Inspectrum and transmit them over the air using SDR hardware. |
| 13 | [Over-the-Air 5G Traffic Prediction using Machine Learning](exp13-over-the-air-5g-traffic-prediction-using-machine-learning.md) | Monitor RF spectrum activity with a HackRF SDR, build a spectrum-activity dataset and classify wireless activities with a machine learning model. |
| 14 | [Live Spectrum Monitoring using QSpectrumAnalyzer](exp14-live-spectrum-monitoring-using-qspectrumanalyzer.md) | Monitor the spectrum and analyse signals in real time using QSpectrumAnalyzer. |
| 15 | [Modulation Classification using CNN](exp15-modulation-classification-using-cnn.md) | Identify the modulation type of received signals using a Convolutional Neural Network (CNN), covering dataset preparation, model training, evaluation and prediction. Two methods are given: Method 1 uses the Deep Radio and Wi-Guy hardware, and Method 2 uses the Kaggle platform with real-time samples. |

## By topic

<div class="grid cards" markdown>

-   **Getting started with the tools**

    ---

    - [1. Using the Embedded Python Block in GNU Radio Companion](exp01-using-the-embedded-python-block-in-gnu-radio-companion.md)
    - [2. Time-Frequency Analysis using Inspectrum](exp02-time-frequency-analysis-using-inspectrum.md)
    - [3. Spectrum Analysis using GQRX](exp03-spectrum-analysis-using-gqrx.md)
    - [14. Live Spectrum Monitoring using QSpectrumAnalyzer](exp14-live-spectrum-monitoring-using-qspectrumanalyzer.md)

-   **Signal processing and demodulation**

    ---

    - [4. FIR Filter Design and Analysis](exp04-fir-filter-design-and-analysis.md)
    - [5. FM Demodulation](exp05-fm-demodulation.md)

-   **Over-the-air modems**

    ---

    - [8. QPSK Transmission, Reception and BER Analysis](exp08-qpsk-transmission-reception-and-ber-analysis.md)
    - [9. BPSK Transmission and Reception (Live Text)](exp09-bpsk-transmission-and-reception-live-text.md)
    - [10. AM Transmission and Reception](exp10-am-transmission-and-reception.md)
    - [11. FM Transmission and Reception](exp11-fm-transmission-and-reception.md)

-   **5G**

    ---

    - [12. 5G Signal Generation and Transmission](exp12-5g-signal-generation-and-transmission.md)
    - [13. Over-the-Air 5G Traffic Prediction using Machine Learning](exp13-over-the-air-5g-traffic-prediction-using-machine-learning.md)

-   **Machine learning**

    ---

    - [6. Live Channel Prediction using Machine Learning](exp06-live-channel-prediction-using-machine-learning.md)
    - [7. ON/OFF Activity Prediction using Machine Learning](exp07-on-off-activity-prediction-using-machine-learning.md)
    - [13. Over-the-Air 5G Traffic Prediction using Machine Learning](exp13-over-the-air-5g-traffic-prediction-using-machine-learning.md)
    - [15. Modulation Classification using CNN](exp15-modulation-classification-using-cnn.md)

</div>

The book [Deep Radio: Hands-On Wireless AI](../resources/book.md) covers many of these topics in more depth.
