Attribute VB_Name = "Module1"
Sub finance()

    'Loop through all sheets
    Dim Current As Worksheet
    
    For Each Current In Worksheets
    
        'Declaring variables
        Dim opening As Double
        Dim closing As Double
        Dim yearly_change As Double
        Dim percent_change As Double
        Dim volume As Double
        Dim counter As Integer
        
        counter = 2
        opening = Cells(2, 3).Value
        
        'Creating headers
        Cells(1, 9).Value = "Ticker"
        Cells(1, 10).Value = "Yearly Change"
        Cells(1, 11).Value = "Percent Change"
        Cells(1, 12).Value = "Total Stock Volume"
    
        'loop through all available data
        For i = 2 To ActiveSheet.UsedRange.Rows.Count

            If Cells(i, 1).Value <> Cells(i + 1, 1).Value Then
                'finalise volume
                volume = volume + Cells(i, 7).Value

                'create datapoints
                closing = Cells(i, 6).Value
                yearly_change = closing - opening
                percent_change = (yearly_change / opening) * 100

                'place datapoints + formatting
                'ticker
                Cells(counter, 9).Value = Cells(i, 1).Value
                'yearly change
                Cells(counter, 10).Value = yearly_change
                If yearly_change >= 0 Then
                    Cells(counter, 10).Interior.ColorIndex = 4
                Else
                    Cells(counter, 10).Interior.ColorIndex = 3
                End If
                'percent change
                Cells(counter, 11).Value = percent_change
                Cells(counter, 11).NumberFormat = "##0.0\%"
                'volume
                Cells(counter, 12).Value = volume

                'reset volume and opening, and add counter
                volume = 0
                opening = Cells(i + 1, 3).Value
                counter = counter + 1
            Else
                'adds to total volume and continues on
                volume = volume + Cells(i, 7).Value
            End If
    
        Next i
    
    Next

End Sub
