import yaml
import json
import sys

def yaml_to_json(yaml_file, json_file):
    # Read YAML file
    with open(yaml_file, 'r') as yf:
        try:
            yaml_data = yaml.safe_load(yf)
        except yaml.YAMLError as exc:
            print(f"Error parsing YAML file: {exc}")
            sys.exit(1)
    
    # Convert to JSON and write to file
    with open(json_file, 'w') as jf:
        json.dump(yaml_data, jf, indent=4)
    
    print(f"Successfully converted {yaml_file} to {json_file}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py <input_yaml_file> <output_json_file>")
        sys.exit(1)
    
    yaml_file = sys.argv[1]
    json_file = sys.argv[2]
    
    yaml_to_json(yaml_file, json_file)