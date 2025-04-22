from transformers import BertTokenizer, BertForSequenceClassification
import torch

# 1. Load the saved model and tokenizer
model_path = "./bert_model"

model = BertForSequenceClassification.from_pretrained(model_path)
tokenizer = BertTokenizer.from_pretrained(model_path)

# 2. Define a function to preprocess the input query
def preprocess_query(query):
    inputs = tokenizer(query, return_tensors="pt", padding=True, truncation=True, max_length=128)
    return inputs

# 3. Define a function to run predictions on a single query
def predict(query):
    inputs = preprocess_query(query)
    
    # Move model to the correct device (GPU if available)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    inputs = {key: val.to(device) for key, val in inputs.items()}
    
    # Get the prediction
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    prediction = torch.argmax(logits, dim=1).item()  # Get the predicted label (0 or 1)
    
    return prediction
