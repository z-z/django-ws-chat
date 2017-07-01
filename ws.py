#!/usr/bin/env python

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dango_ws_chat.settings")
django.setup()

import asyncio
import websockets
from chat.views import saver

connected = set()

async def loop(websocket, path):
    global connected
    connected.add(websocket)
    while True:
        data = await websocket.recv()
        response = saver(data)
        await asyncio.wait([ws.send(response) for ws in connected])

start_server = websockets.serve(loop, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()