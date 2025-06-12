import pandas as pd
import sys
from datetime import datetime

def calculate_time_differences(input_file):
    # Load the data
    df = pd.read_csv(input_file, parse_dates=['timestamp'])

    # Initialize a dictionary to store time differences
    time_differences = {'TRUE': [], 'FALSE': []}

    # Group by componentName and control
    for control_value in df['control'].unique():
        control_str = 'TRUE' if control_value else 'FALSE'
        grouped = df[df['control'] == control_value]
        times = {}  # To store the start times

        for index, row in grouped.iterrows():
            component = row['componentName']
            timestamp = row['timestamp']
            action = row['action']

            if action == 'start':
                times[component] = timestamp
            elif action == 'stop' and component in times:
                time_diff = (timestamp - times[component]).total_seconds()
                time_differences[control_str].append({'componentName': component, 'timeDifference': time_diff})
                del times[component]  # Remove after calculating the difference

    # Convert to DataFrame for easy display
    true_df = pd.DataFrame(time_differences['TRUE'])
    false_df = pd.DataFrame(time_differences['FALSE'])

    # Save the results to CSV files
    true_df.to_csv('true_control_time_differences.csv', index=False)
    false_df.to_csv('false_control_time_differences.csv', index=False)

    print("Results saved to 'true_control_time_differences.csv' and 'false_control_time_differences.csv'.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <input_file.csv>")
        sys.exit(1)

    input_file = sys.argv[1]
    calculate_time_differences(input_file)
