import json
import csv
import sys
import os

def main():
    # Check if an input file is provided in the terminal
    if len(sys.argv) < 2:
        print("Usage: python json_to_csv.py <input_file>")
        sys.exit(1)

    # Get the input file
    input_file = sys.argv[1]

    # Ensure the input file exists
    if not os.path.isfile(input_file):
        print(f"Error: File '{input_file}' not found.")
        sys.exit(1)

    # Generate the output file name by changing the file extension to .csv
    file_name, _ = os.path.splitext(input_file)  # Extract the file name without extension
    output_file = f"{file_name}.csv"

    try:
        # Load the JSON data from the specified input file
        with open(input_file, 'r', encoding='utf-8') as file:
            json_data = json.load(file)
    except json.JSONDecodeError:
        print(f"Error: File '{input_file}' is not valid JSON.")
        sys.exit(1)

    # Open CSV file for writing
    with open(output_file, mode='w', newline='', encoding='utf-8') as csv_file:
        csv_writer = csv.writer(csv_file)

        # Write the header row
        csv_writer.writerow(["timestamp", "componentName", "action", "control"])

        # Iterate through the JSON and write each row to the CSV
        for entry in json_data:
            timestamp = entry.get("timestamp", "")
            componentName = entry.get("componentName", "")
            action = entry.get("action", "")
            control = entry.get("control", "")

            # If `componentName` is a list (e.g., for the first entry), flatten it
            if isinstance(componentName, list):
                for sub_entry in componentName:
                    sub_category = sub_entry.get("category", "")
                    sub_text = sub_entry.get("text", "")
                    csv_writer.writerow([timestamp, f"{sub_category}: {sub_text}", action, control])
            else:
                csv_writer.writerow([timestamp, componentName, action, control])

    print(f"CSV file has been created: {output_file}")

if __name__ == "__main__":
    main()