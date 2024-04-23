from langchain_openai.chat_models import ChatOpenAI
from langchain.agents import create_json_agent
from langchain_community.agent_toolkits import JsonToolkit
from langchain.tools.json.tool import JsonSpec
import json
import re

file="/Users/Sandhya.Bhatia/code/quantiedge/edge-app/src/machine_sample_data.json"
with open (file,"r") as f1:
    data=json.load(f1)
    f1.close()

    spec = JsonSpec (dict_=data,max_value_length=4000)
    toolkit = JsonToolkit (spec = spec)
    #agent=create_json_agent(llm=ChatOpenAI(openai_api_key="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",temperature=0,model="gpt-4"),toolkit=toolkit,max_iterations=1000,verbose=True)
    #queryOutput = agent.run("Calculate the OEE of the data and Return only Final Answer")

# Regular expression pattern to find the OEE value (either decimal or percentage format)
pattern = r'(\d+(?:\.\d+)?)(?:\s*(?:or)?\s*(\d+)%?)?'

# Find OEE value using regular expression search
matches = re.findall(pattern, queryOutput)

# If matches are found
if matches:
    # Extract the OEE value from the last match
    oee_decimal = float(matches[-1][0])  # Extract the decimal value
    oee_percentage = int(matches[-1][1]) if matches[-1][1] else None  # Extract the percentage value (if available)

    # Choose the appropriate representation based on the presence of the percentage value
    oee_value = oee_percentage if oee_percentage is not None else oee_decimal

    print("OEE:", oee_value)
else:
    print("OEE value not found.")
