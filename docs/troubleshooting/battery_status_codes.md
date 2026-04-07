# BatStatusInv

###### коди стану батареї з таблиці Data History інвертора

| BatStatusInv | Поведінка інвертора                                                                                         |
| :----------- | :---------------------------------------------------------------------------------------------------------- |
| 0x00         | No charge, No discharge                                                                                     |
| 0x01         | Charge allowed, no discharge                                                                                |
| 0x02         | Discharge allowed, no Charge                                                                                |
| 0x03         | Charge allowed, Discharge allowed                                                                           |
| 0x10         | Requesting forced charge, but both charge and discharge not allowed                                         |
| 0x11         | Requesting forced charge, charge allowed, will charge battery from Grid if available, discharge not allowed |
| 0x12         | Requesting forced charge, charge not allowed, no charge, no discharge                                       |
| 0x13         | Requesting forced charge, charge allowed, will charge battery from Grid if available, discharge allowed     |
| 0x20         | Requesting forced charge, but both charge and discharge not allowed                                         |
| 0x21         | Requesting forced charge, charge allowed, will charge battery from Grid if available, discharge not allowed |
| 0x22         | Requesting forced charge, charge not allowed, no charge, no discharge                                       |
| 0x23         | Requesting forced charge, charge allowed, will charge battery from Grid if available, discharge allowed     |
