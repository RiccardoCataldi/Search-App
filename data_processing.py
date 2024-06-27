import pandas as pd

def get_data():

    #Cargo 
    cargo_data = pd.read_csv('aisdk-2024-02-02-cargo.csv',delimiter=',')
    cargo_data['Ship type'] = 'Cargo'
    cargo_data = cargo_data[['Time','Ship type','MMSI','Latitude','Longitude']]

    #Tanker
    tanker_data = pd.read_csv('aisdk-2024-02-02-tanker.csv',delimiter=';')
    tanker_data = tanker_data.rename(columns={"TIME": "Time"})

    #All
    data = pd.concat([cargo_data,tanker_data],ignore_index=True)
    
    #Filter
    data = data.drop_duplicates()
    data = data[(data['Latitude'] >= -90) & (data['Latitude'] <= 90)]
    
    data['Time'] = pd.to_datetime(data['Time'], format='%d/%m/%Y %H:%M:%S')
    

    return data

if __name__ == '__main__':
    data = get_data()
    print(data)
    