Attribute VB_Name = "Module1"
Sub summary()

    'creating descriptions
    Range("O1").Value = "Ticker"
    Range("P1").Value = "Value"
    Range("N2").Value = "Greatest % Increase"
    Range("N3").Value = "Greatest % Decrease"
    Range("N4").Value = "Greatest Total Volume"
    
    'determining greatest precentage increase
    Dim ticker_pi As String
    Dim value_pi As Double
    
    ticker_pi = ""
    value_pi = 0
    
    For i = 2 To Range("K2").End(xlDown).Row
        
        If Cells(i, 11).Value > value_pi Then
            ticker_pi = Cells(i, 9).Value
            value_pi = Cells(i, 11).Value
        Else
            'continues on
        End If
        
        Range("O2").Value = ticker_pi
        Range("P2").Value = value_pi
        Range("P2").NumberFormat = "##0.0\%"
        
    Next i
    
    'determining greatest precentage decrease
    
    Dim ticker_pd As String
    Dim value_pd As Double
    
    ticker_pd = ""
    value_pd = 0

    For i = 2 To Range("K2").End(xlDown).Row
        
        If Cells(i, 11).Value < value_pd Then
            ticker_pd = Cells(i, 9).Value
            value_pd = Cells(i, 11).Value
        Else
            'continues on
        End If
        
        Range("O3").Value = ticker_pd
        Range("P3").Value = value_pd
        Range("P3").NumberFormat = "##0.0\%"
        
    Next i
    
    'determining greatest total volume
    Dim ticker_gv As String
    Dim value_gv As Double
    
    ticker_gv = ""
    value_gv = 0
    
    For i = 2 To Range("K2").End(xlDown).Row
        
        If Cells(i, 12).Value > value_gv Then
            ticker_gv = Cells(i, 9).Value
            value_gv = Cells(i, 12).Value
        Else
            'continues on
        End If
        
        Range("O4").Value = ticker_gv
        Range("P4").Value = value_gv
        
    Next i
    
End Sub
