import pandas as pd
import random
import json

# Load the dataset
df = pd.read_csv("./fashion-dataset/styles.csv", on_bad_lines="skip")

# Define your target categories
TARGET_CATEGORIES = ["Jackets", "Casual Shoes", "Flip Flops", "Tops", "Bracelet", "Trousers", "Shirts", "Tshirts" "Socks", "Ring", "Earrings", "Watches", "Caps", "Sweatshirts", "Shorts"]

# Filter for rows where subCategory or articleType is in the target categories
filtered_df = df[(df["subCategory"].isin(TARGET_CATEGORIES)) | (df["articleType"].isin(TARGET_CATEGORIES))].copy()

# Initialize the transformed data structure
transformed_data = {"lady": {"sale": [], "normal": []}, "men": {"sale": [], "normal": []}}

# Function to generate random price and sale status
def process_product(row):
    product = {
        "id": row["id"],
        "name": row["productDisplayName"] if pd.notna(row["productDisplayName"]) else row.get("articleType", "Unknown"),
        "image": f"{row['id']}.jpg",  # Placeholder image path
        "price": random.randint(10, 200),  # Random price
        "category": row["articleType"] if pd.notna(row["articleType"]) else row.get("subCategory", "Unknown"),
        "gender": row["gender"],
    }
    # Randomly assign sale status
    product["sale"] = random.choice([True, False])
    product["sustainable"] = random.choice([True, False])
    if product["sale"]:
        product["previous"] = round(product["price"] * random.uniform(1.0, 2.0), 2)  # 20% higher for previous price
    return product

# Temporary storage to group products by gender, sale status, and subcategory
grouped_products = {"lady": {"sale": {}, "normal": {}}, "men": {"sale": {}, "normal": {}}}

# Group products by gender, sale status, and subcategory
for _, row in filtered_df.iterrows():
    # Ignore rows where gender is not 'Men' or 'Women'
    if row["gender"] not in ["Men", "Women"]:
        continue
    
    product = process_product(row)

    # Assign to 'lady' or 'men' based on gender
    gender_group = "lady" if row["gender"].lower() == "women" else "men"
    sale_status = "sale" if product["sale"] else "normal"

    # Group by subcategory
    category = product["category"]
    if category not in grouped_products[gender_group][sale_status]:
        grouped_products[gender_group][sale_status][category] = []
    grouped_products[gender_group][sale_status][category].append(product)

# Limit the number of products per subcategory (15 max)
LIMIT = 5
for gender in ["lady", "men"]:
    for sale_status in ["sale", "normal"]:
        for category, products in grouped_products[gender][sale_status].items():
            # Sample up to LIMIT products per subcategory
            sampled_products = random.sample(products, min(LIMIT, len(products)))
            transformed_data[gender][sale_status].extend(sampled_products)

# Save the transformed data to a JSON file
with open("transformed_fashion_data.json", "w") as f:
    json.dump(transformed_data, f, indent=4)

print("Data transformation complete!")