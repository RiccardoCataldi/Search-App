# Search App
Web app that allows searching information about ships via MMSI, including trajectory, length, and ship type.


## Installation

-  [Download](https://drive.google.com/file/d/1M8rGHk5xnxGmvG3fIiN_L1yD_aaU6-Y1)
 The first datasets **aisdk-2024-02-02-cargo.csv** 

- [Download](https://drive.google.com/file/d/12y173qPxskitWrmC7BRloHcXaq5Vtgdj) The second dataset **aisdk-2024-02-02-tanker.csv**

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install dependencies.

```bash
pip install -r .\requirements.txt
```

## Usage
```python
 python .\main.py
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```
- Access the application in your web browser at http://localhost:5000/.
- Search: Enter an MMSI in the form and select the desired search type. Click the "Search" button to retrieve information.

## Notes
- Virtual environment is recommended
- Tested on Python 3.12.4

