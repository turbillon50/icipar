#!/bin/bash
cd /root/icipar/hg
gen(){ higgsfield generate create nano_banana_2 --prompt "$2" --wait > "$1.log" 2>&1; }
gen hero "Cinematic wide interior of a historic Mexican Christian church, warm sunlight through tall arched windows, wooden pews, stone columns, reverent heritage atmosphere, photorealistic, rich balanced color, no text" &
gen church1 "Historic Baptist church exterior in Guadalajara Mexico, old stone facade, blue sky, photoreal heritage architecture, no text" &
gen church2 "Modern evangelical church campus Monterrey Mexico, bright welcoming building, photoreal, no text" &
gen church3 "Historic Pentecostal church Mexico City, classic colonial facade, golden hour soft light, photoreal, no text" &
gen church4 "19th century Methodist church Oaxaca Mexico, colonial stone architecture, warm tones, photoreal, no text" &
gen church5 "Frontier community church Tijuana Mexico, contemporary sunny, photoreal, no text" &
gen community "Diverse Mexican congregation gathered, archival warm documentary photo of a faith community, photoreal, no text" &
wait
echo ALLDONE
