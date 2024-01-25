# Module 21 Report 

## Overview of the Analysis

The purpose of this analysis is to determine whether an acceptable neural network binary classifier can be created to correctly predict whether applicants will be successsful if funded by nonprofit Alphabet Soup.

## Data Preprocessing

The model provided its prediction based on the following variables available in provided data:
- APPLICATION_TYPE (Alphabet Soup application type)
- AFFILIATION (Affiliated sector of industry)
- CLASSIFICATION (Government organisation classification)
- USE_CASE (Use case for funding)
- ORGANIZATION (Organisation type)
- STATUS (Active status)
- INCOME_AMT (Income classification)
- SPECIAL_CONSIDERATIONS (Special considerations for application)
- ASK_AMT (Funding amount requested)
- IS_SUCCESSFUL (Was the money used effectively)

Columns EIN and NAME were identification columns, and as such were not considered.

Provided data was preprocessed before feeding it to the model. Steps include:
1. Dropping EIN and NAME columns.
2. Binning application types that appear less than 500 times to 'Other' bin to reduce parameters.
3. Binning classification types that appear less than 1500 times to 'Other' bin to reduce parameters.
4. Encoding all categorical variables into binary variables.
5. Scaling input data with StandardScaler()

Features used to classify cases were APPLICATION_TYPE, AFFILIATION, CLASSIFICATION, USE_CASE, ORGANISATION, STATUS, INCOME_AMT, SPECIAL_CONSIDERATIONS and ASK_AMT.

The target variable was IS_SUCCESSFUL (0 being unsuccessful, and 1 being successful).

## Model Structure and Iterations

In all iterations, the first layer had the argument input_dim=36 as there were 36 columns available for the model to use by the end of data preprocessing. In addition, all models were compiled with the binary_crossentropy loss function, adam optimiser, and was measured based on accuracy.

The first iteration of the model had the following structure:

 Layer (activation)         Output Shape              Param #   
=================================================================
 dense_3 (relu)             (None, 10)                370       
                                                                 
 dense_4 (relu)             (None, 5)                 55        
                                                                 
 dense_5 (sigmoid)          (None, 1)                 6         

The following was the final result of training of the first iteration.

Epoch 100/100 - 804/804 - 2s 2ms/step - loss: 0.5622 - accuracy: 0.7284

268/268 - 0s - loss: 0.5717 - accuracy: 0.7228 - 473ms/epoch - 2ms/step
Loss: 0.5717006921768188, Accuracy: 0.7227988243103027

As this did not satisfy the desired accuracy of 75% or above, multiple iterations were done with changes, which were unfortunately not recorded.
- The output layer's activation function was changed to 'softmax', which greatly reduced accuracy by end of training.
- Dropout layers were used in later iterations to reduce chances of overfitting. Percentages were altered, to little effect.
- More layers and neurons were added to see if it could improve accuracy. Epochs were increased from 100 to 150 in another iteration.
- Throughout the attempts, the 'relu' function (for hidden layers) and 'sigmoid' function (for the output layer) were the best in accuracy.

The ninth iteration of the model was the final iteration. It had the following structure.

 Layer (activation)          Output Shape              Param #   
=================================================================
 dense_40 (relu)             (None, 200)               7400      
                                                                 
 dense_41 (relu)             (None, 150)               30150     
                                                                 
 dropout_16 (Dropout)        (None, 150)               0         
                                                                 
 dense_42 (relu)             (None, 150)               22650     
                                                                 
 dropout_17 (Dropout)        (None, 150)               0         
                                                                 
 dense_43 (relu)             (None, 100)               15100     
                                                                 
 dense_44 (relu)             (None, 100)               10100     
                                                                 
 dense_45 (sigmoid)          (None, 1)                 101       

All dropout layers had percentages of 10%.

The following was the final result of training of the final iteration.

Epoch 100/100 - 804/804 - 3s 4ms/step - loss: 0.5598 - accuracy: 0.7306

268/268 - 1s - loss: 0.5816 - accuracy: 0.7227 - 601ms/epoch - 2ms/step
Loss: 0.5815666317939758, Accuracy: 0.7226822376251221

While there was a slight improvement in accuracy upon validation, it did not reach the desired accuracy of 75% or above. Furthermore, upon testing the final iteration with test data, there was no improvement in accuracy.

All attempts at creating a model which reached the desired accuracy have failed.

## Summary

The first model iteration had an accuracy of 72.3% with loss of 0.57 upon testing with ground truth data, while the final iteration had an accuracy of 72.3% with loss of 0.58. Both models, and all models made between, failed to reach the desired accuracy of 75% or above.

Future improvements could include more layers and/or neurons per layer, as usually the higher the number of layers/neurons, the better accuracy gets. This however increases the likelihood of overfitting, and is also computationally expensive. As for activation functions, considering the requirements of the model, relu and sigmoid functions remain the ideal activation functions to use, as the model is a binary classifier. More data could be provided to improve accuracy too.

## Addentum - Automation Results

Further work was done on the model by automating the process of finding the best hyperparameters through keras_tuner.

keras_tuner was set to these limits on hyperparameters:
- Activation functions only allowed in hidden layers are relu, tanh and sigmoid.
- It was allowed to make 3-8 hidden layers. It always created an input and output layer.
- The input layer could have 150-200 neurons.
- The hidden layers could have 25-150 neurons.
- The output layer is always a dense layer with one neuron and a sigmoid activation.
- Epochs ranged from 1 to 100.

The following is raw output of the best hyperparameters:

> {'activation': 'sigmoid',
>  'first_units': 200,
> 'num_layers': 2,
> 'units_0': 100,
> 'units_1': 50,
> 'units_2': 75,
> 'units_3': 150,
> 'units_4': 150,
> 'units_5': 50,
> 'tuner/epochs': 7,
> 'tuner/initial_epoch': 0,
>   ...}

The following are the results:

268/268 - 1s - loss: 0.5697 - accuracy: 0.7278 - 586ms/epoch - 2ms/step
Loss: 0.5696994066238403, Accuracy: 0.7278134226799011

The model created by keras_tuner was not able to create a model that satified the desired accuracy requirement. Therefore, other avenues of improving accuracy, like improving quality of provided data or increasing amount of input data, should be explored.
