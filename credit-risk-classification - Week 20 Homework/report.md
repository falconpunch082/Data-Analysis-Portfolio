# Module 20 Report 

## Overview of the Analysis

The purpose of this analysis is to determine whether the Logistic Regression model from SciKit Learn is adequate in predicting whether a case would be a healthy loan or high-risk loan.

The model provided its prediction based on the following variables:
- Loan size
- Interest rate
- Borrower's income
- Debt-to-income ratio
- Number of accounts the borrower has
- Derogatory marks, and
- Total debt prior to taking the loan.

No preprocessing was done to the data prior to fitting it to the model. Provided data was split to 75% training data and 25% validation/testing data.

## Results

True negative: 18663

True positive: 563

False negative: 56

False positive: 102

Accuracy: 99%

Healthy loan prediction precision: 100%

Healthy loan prediction recall: 99%

High-risk loan prediction precision: 85%

High-risk loan prediction recall: 0.91%

## Discussion

From the results above, it can be determined that:

- The logistic regression model adequately predicted whether certain cases were healthy or high-risk loans, with a near-perfect accuracy.
- While the model wrongfully categorised a percent of healthy loan cases to be the contrary, everything it flagged as healthy loans were actually healthy loans (very high recall and precision).
- The model, however, did wrongfully categorised nearly all of the high-risk loan cases as healthy loan cases. There was a 85% chance that the model correctly identified high-risk loan cases.

Considering that only 3.2% of provided data are classified as high-risk loans, it is no wonder that the model can identify healthy loans with near-perfect accuracy but cannot identify high-risk loans adequately. It is due to the lack of high-risk loan cases that the model is not able to learn adequately the traits of a high-risk loan.


## Summary

Using the Logistic Regression model for identifying whether a loan is healthy or high-risk has proven to be adequate due to the near-perfect accuracy it has exhibited. However, the model should be trained with data containing equal amounts healthy and high-risk loan cases so that it will be able to better correctly identify cases.
