# Experiment 15: Modulation Classification using CNN

## Aim

To identify the modulation type of received signals using a Convolutional Neural Network (CNN), covering dataset preparation, model training, evaluation and prediction. Two methods are given: Method 1 uses the Deep Radio and Wi-Guy hardware, and Method 2 uses the Kaggle platform with real-time samples.

## Method 1: Using Deep Radio and Wi-Guy

**Required hardware:** Deep Radio, Wi-Guy

**Required software:** Python

### I. Dataset Preparation

1.  Switch on the Deep Radio and Wi-Guy.

2.  Open the GNU Radio Companion window.

3.  Open and run the BPSK modulation flowgraph from the directory Desktop/ML.

4.  Check the status of the waveform transmission at the bottom left of the screen.

5.  On the Wi-Guy, go to the CNN directory.

6.  Run the following command:

    ```bash
    sudo python3 prepare_data_deep-radio_train_and_test.py -sampling_rate 2400000 -decimation_rate 12 -sdr 1
    ```

7.  When prompted **Enter class name:**, enter BPSK. The BPSK samples are captured and saved in .npy format. Collection ends when the number of testing samples set in the code is reached. The program then asks for a class name again.

8.  In the GNU Radio Companion window, stop the BPSK transmission. Open and run the QPSK modulation flowgraph from Desktop/ML.

9.  On the Wi-Guy, enter QPSK as the class name.

10. Repeat for the other modulation types.

11. Two folders, training_data and testing_data, are created. Each contains a sub-folder for every modulation class (BPSK, QPSK, GMSK, etc.).

12. Each sub-folder of training_data holds 375 .npy files and each sub-folder of testing_data holds 125.

### II. Model Generation

1.  On the Wi-Guy, go to the CNN directory.

2.  Run the following command:

    ```bash
    sudo nano train_data_deep-radio.py
    ```

3.  In the code, set the path to the training_data folder in the train_path line and the order of the modulation types in the classes line. Enter the CNN model name and the history name in the lines provided.

4.  Run the following command:

    ```bash
    sudo python3 train_data_deep-radio.py
    ```

5.  The CNN model and its history are generated and saved on the Wi-Guy.

### III. Model Evaluation

1.  On the Wi-Guy, go to the CNN directory.

2.  Run the following command:

    ```bash
    sudo nano test_data_deep-radio.py
    ```

3.  In the code, set the path to the testing_data folder in the test_path line and the order of the modulation types in the classes line. Enter the paths to the generated CNN model and history in the lines provided.

4.  Run the following command:

    ```bash
    sudo python3 test_data_deep-radio.py
    ```

5.  The test accuracy and classification report are displayed. The loss vs epochs, accuracy vs epochs and confusion matrix plots are saved on the Wi-Guy.

### IV. Model Prediction

1.  Switch on the Deep Radio and open the GNU Radio Companion window.

2.  Open and run the BPSK modulation flowgraph from Desktop/ML.

3.  Check the status of the waveform transmission at the bottom left of the screen.

4.  Switch on the Wi-Guy and go to the CNN directory.

5.  Run the following command:

    ```bash
    sudo nano predict_deep-radio.py
    ```

6.  In the code, set the path to the generated CNN model and the order of the modulation types in the classes line.

7.  Run the following command:

    ```bash
    sudo python3 predict_deep-radio.py
    ```

8.  The predicted class and the prediction accuracy are displayed.

9.  Stop the BPSK transmission on the Deep Radio and run the flowgraph of another modulation type (for example QPSK). Check the new prediction on the Wi-Guy.

## Method 2: Using the Kaggle Platform (Real-Time Samples)

### Kaggle account and files

- Go to www.kaggle.com, click **Register** and create an account.

- Download the Python files and notebooks from: https://tinyurl.com/crl-comsnets

- The dataset (RFSC dataset) is at: https://www.kaggle.com/datasets/chandharlabs/rfsc-dataset

### A. Training

1.  Go to the **Code** menu on the left side and click **New Notebook**.

2.  From the **File** menu, use the upload option to upload `train_CNN_NITT_2023.ipynb`.

3.  Enter a name for the notebook in the header.

4.  Click **Add data** in the top right corner. Using the **search by URL** tab and the RFSC dataset link above, add the training and testing data to the notebook.

5.  In the "Data for training the model" cell, set the train_path line to:

    ```text
    /kaggle/input/rfsc-dataset/Dataset_Deep_Radio/Dataset_Deep_Radio/training_data
    ```

6.  In the model.save line, enter the model name with the .hdf5 extension.

7.  Run the notebook. Use **Run current cell** for one cell, or **Run all** for the whole notebook. The output of each cell is shown after it runs.

8.  To keep the results, click **Save Version**. In the window that opens, select **Save & Run All (Commit)**. Under **Advanced settings** (bottom left), select **Always save output when creating a Quick Save**.

9.  The CNN model and its output graphs are saved in that version.

10. To download them, open the version with **Go to viewer**, click the **Data** menu and open **Output** on the right. Click the three vertical dots and download the output. A results folder in .zip format is saved to your Downloads folder.

### B. Testing

1.  Click **New Notebook** and upload `test_CNN_NITT_2023.ipynb`.

2.  Upload the results .zip folder downloaded from the training notebook.

3.  Give the paths of the model file and the history file from the results folder.

4.  In the "Call the CNN Model for testing" cell, set the test_path line to:

    ```text
    /kaggle/input/rfsc-dataset/Dataset_Deep_Radio/Dataset_Deep_Radio/testing_data
    ```

5.  Click **Run all**. The model is evaluated on the RFSC testing data, and the loss vs epochs, accuracy vs epochs and confusion matrix plots and the metrics are displayed.

### C. Feature maps

1.  Click **New Notebook** and upload `featuremap_CNN_NITT_2023.ipynb`.

2.  Upload the results .zip folder from the training notebook.

3.  Copy the paths of the model file and the history file from the results folder into the notebook.

4.  Run the notebook. It shows the filter outputs of the individual layers and the feature maps of the convolution and max-pooling layers.

### D. Weights and biases

1.  Click **New Notebook** and upload `weight_bias_CNN_NITT_2023.ipynb`.

2.  Upload the results .zip folder from the training notebook.

3.  Copy the path of the model file from the results folder into the notebook.

4.  Run the notebook. It shows the weight and bias values of each layer.

### E. Prediction

The sample used for prediction was captured with the RTL-SDR on the Wi-Guy using this command:

```bash
rtl_sdr -f 810000000 -g 40 -s 2400000 -n 1221376 BPSK_1.dat
```

1.  Click **New Notebook** and upload `predict_cnn.ipynb`.

2.  Upload the results .zip folder from the training notebook.

3.  Give the path of the model file from the results folder.

4.  In the "Predicting the modulation type used in the real-time signals" cell, set the filename line to the path of a single sample file, for example:

    ```text
    /kaggle/input/rfsc-dataset/Dataset_Deep_Radio/Dataset_Deep_Radio/Samples_for_Prediction/dat format/BPSK_1.dat
    ```

5.  In the same cell, set the path line to the sample folder:

    ```text
    /kaggle/input/rfsc-dataset/Dataset_Deep_Radio/Dataset_Deep_Radio/Samples_for_Prediction/dat format
    ```

6.  Run the notebook. The model prediction results are displayed.

## Description

This experiment trains a CNN to recognise the modulation type of a signal from captured IQ samples. Samples of each modulation class (for example BPSK, QPSK and GMSK) are captured from signals transmitted by the Deep Radio and saved as .npy files, split into training and testing sets. The CNN is trained on the training set, evaluated on the testing set using accuracy, a classification report and a confusion matrix, and then used to predict the modulation type of live signals.

The same workflow can be run in the cloud on Kaggle using the RFSC dataset, with extra notebooks to inspect the feature maps and the learned weights and biases of the network.
