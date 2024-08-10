#!/bin/bash

virtualenv venv
source venv/bin/activate
pip install pip --upgrade
pip install -r requirements.txt
pip install nodeenv
nodeenv -p
npm install --local
