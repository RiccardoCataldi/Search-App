# Search App
Web app that allows searching information about ships via MMSI, including trajectory, length, and ship type.

App is currently running at this ip for immediate testing at IP [51.20.82.208](51.20.82.208)
## Installation

- Clone the repository to your local machine:
```bash
git clone https://github.com/RiccardoCataldi/Search-App.git
```
    

-  [Download](https://drive.google.com/file/d/1M8rGHk5xnxGmvG3fIiN_L1yD_aaU6-Y1)
 The first datasets **aisdk-2024-02-02-cargo.csv** 

- [Download](https://drive.google.com/file/d/12y173qPxskitWrmC7BRloHcXaq5Vtgdj) The second dataset **aisdk-2024-02-02-tanker.csv**

- After downloading the CSV files, copy or move them into the main project directory.

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
- Virtual Environment: It is recommended to use a virtual environment to manage dependencies and ensure a clean environment.

- Python Version: The application has been tested on Python 3.12.4.

