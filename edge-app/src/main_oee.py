from langchain_openai.chat_models import ChatOpenAI
from langchain.agents import create_json_agent
from langchain_community.agent_toolkits import JsonToolkit
from langchain.tools.json.tool import JsonSpec
import json

file="/Users/Sanjay.Bhatia/Documents/QuantiEdge_Code/edge-app/src/machine_sample_data.json"
with open (file,"r") as f1:
    data=json.load(f1)
    f1.close()

    spec = JsonSpec (dict_=data,max_value_length=4000)
    toolkit = JsonToolkit (spec = spec)
    agent=create_json_agent(llm=ChatOpenAI(temperature=0,model="gpt-4"),toolkit=toolkit,max_iterations=1000,verbose=True)
    result = agent.run("Calculate the OEE of the data and Return only Final Answer")
    print(result)
