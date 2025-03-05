from langchain_openai.chat_models import ChatOpenAI
from langchain.agents import create_json_agent
from langchain_community.agent_toolkits import JsonToolkit
from langchain.tools.json.tool import JsonSpec
import json
import sys  # Import sys to write to stdout

# Load the JSON data
file = "/Users/Sanjay.Bhatia/Documents/QuantiEdge_Code/edge-app/data/machine_sample_data.json"
with open(file, "r") as f1:
    data = json.load(f1)

# Create the JSON spec and toolkit
spec = JsonSpec(dict_=data, max_value_length=10000)
toolkit = JsonToolkit(spec=spec)

# Create the JSON agent
agent = create_json_agent(
    llm=ChatOpenAI(temperature=0, model="gpt-4"),
    toolkit=toolkit,
    max_iterations=1000,
    verbose=True
)

# Run the agent with the given message
message = agent.run("Calculate the OEE of the data by looking at Final Answer")

# Print the message to stdout
sys.stdout.write(message + "\n")

