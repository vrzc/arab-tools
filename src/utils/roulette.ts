import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { GifEncoder } from '@skyra/gifenc';
import { buffer } from 'node:stream/consumers';

import { Message } from 'discord.js';


async function createRouletteGifImage(sectors: any[], return_stream = false, fps: (15 | 30 | 64) = 15, message?: Message): Promise<any> {
    const gif_image = await createGifImage(120);
    const one_image = await createRouletteImage(sectors, false, false);
    const getRotateRouletteImage = fps <= 15 ? getRotateRouletteImage15fps : fps == 30 ?  getRotateRouletteImage30fps : getRotateRouletteImage64fps ;
    const frames = await getRotateRouletteImage(one_image, message?.guild?.iconURL() || '');

    const one_ctx = await createRouletteImage(sectors, true);
    const roulette_images = [...frames, one_ctx];
    const delays = calculateDelays(roulette_images.length);

    for (let i = 0; i < roulette_images.length; i++) {
        const delay = delays[i];
        await gif_image.encoder.setDelay(delay);
        await gif_image.encoder.addFrame(roulette_images[i]);
    }

    await gif_image.encoder.finish();

    const winner = sectors[sectors.length - 1];
    console.log(winner)
    return return_stream ? { stream: gif_image.stream, winner } : { buffer: await buffer(gif_image.stream), winner };
}

function calculateDelays(frameCount: number): number[] {
    const initialDelay = 20;
    const maxDelay = 250;
    const delays: number[] = [];

    for (let i = 0; i < frameCount; i++) {
        const t = i / (frameCount - 1);
        const easedT = t * t; 
        const delay = initialDelay + (maxDelay - initialDelay) * easedT;
        delays.push(Math.round(delay));
    }

    return delays;
}

async function createGifImage(delay = 120): Promise<{ encoder: GifEncoder; loadImage: typeof loadImage; stream: NodeJS.ReadableStream }> {
    const encoder = new GifEncoder(500, 500);
    const stream = encoder.createReadStream();
    encoder.start();
    encoder.setRepeat(-1);
    encoder.setQuality(1);
    encoder.setTransparent(1);
    return { encoder, loadImage, stream };
}

async function getRotateRouletteImage15fps(image_buffer: Buffer, specific_win_avatar: string): Promise<any[]> {
    const img = await loadImage(image_buffer);
    const avatar = await loadImage(specific_win_avatar);
    return generateFrames(img, avatar, 15);
}

async function getRotateRouletteImage30fps(image_buffer: Buffer, specific_win_avatar: string): Promise<any[]> {
    const img = await loadImage(image_buffer);
    const avatar = await loadImage(specific_win_avatar);
    return generateFrames(img, avatar, 30);
}

async function getRotateRouletteImage64fps(image_buffer: Buffer, specific_win_avatar: string): Promise<any[]> {
    const img = await loadImage(image_buffer);
    const avatar = await loadImage(specific_win_avatar);
    return generateFrames(img, avatar, 64)
}

async function generateFrames(img: any, avatar: any, frameCount: number): Promise<any[]> {
    const canvasWidth = 500;
    const canvasHeight = 500;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const angleIncrement = (2 * Math.PI) / frameCount;
    const frames: any[] = [];

    for (let i = 0; i < frameCount; i++) {
        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d')!;
        ctx.save();

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const angle = angleIncrement * i;

        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(499, 203);
        ctx.lineTo(468, 230);
        ctx.lineTo(499, 257);
        ctx.fillStyle = '#e2e2e2';
        ctx.fill();
        ctx.closePath();

        drawAvatar(ctx, avatar, canvas.width / 2, canvas.height / 2, 50);

        frames.push(ctx);
    }

    return frames;
}

function drawAvatar(ctx: any, avatar: any, x: number, y: number, radius: number) {
    ctx.beginPath();
    ctx.arc(x, y, radius + 2, 0, Math.PI * 2, true);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
    ctx.clip();

    const aspect = avatar.height / avatar.width;
    const hsx = radius * Math.max(1.0 / aspect, 1.0);
    const hsy = radius * Math.max(aspect, 1.0);
    ctx.drawImage(avatar, x - hsx, y - hsy, hsx * 2, hsy * 2);
}

async function createRouletteImage(sectors: any[], return_ctx = false, pointer = true, specific_win_avatar?: string): Promise<any> {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d')!;
    const sectorAngle = (2 * Math.PI) / sectors.length;

    for (let i = 0; i < sectors.length; i++) {
        const sector = sectors[i];
        const startAngle = sectorAngle * i;
        const endAngle = startAngle + sectorAngle;

        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 244, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = sector.color;
        ctx.fill();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(startAngle + sectorAngle / 2);
        let text = `${sector.number + 1}- ${sector.username}`.trim();
        ctx.textAlign = "left";
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${Math.round(24 - sectors.length * 0.25)}px Tajawal,Symbola,Symbola_hint,DejaVuSans,NotoRegular,NotoEmoji,Arial`;
        ctx.fillText(text.length >= 14 ? text.slice(0, 12) + ".." : text.slice(0, 16), 86, 4);
        ctx.restore();

        const angle = i * sectorAngle;
        const x = Math.cos(angle) * 244 + 250;
        const y = Math.sin(angle) * 244 + 250;
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.lineTo(x, y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(250, 250, 244, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    if (pointer) {
        ctx.beginPath();
        ctx.moveTo(499, 203);
        ctx.lineTo(468, 230);
        ctx.lineTo(499, 257);
        ctx.fillStyle = '#e2e2e2';
        ctx.fill();
        ctx.closePath();

        const avatar = await loadImage(specific_win_avatar || sectors[sectors.length - 1].avatarURL);
        drawAvatar(ctx, avatar, canvas.width / 2, canvas.height / 2, 50);
    }

    return return_ctx ? ctx : await canvas.toBuffer('image/png');
}

function getRandomNumber(length: number, excludedNumbers: number[] = []): number {
    let number = 0;
    do {
        number = Math.floor(Math.random() * length) + 1;
    } while (excludedNumbers.includes(number));
    return number;
}

function getRandomGifColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    return '#' + hex;
}

function getRandomDarkHexCode(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';

    while (true) {
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        if (getBrightness(color) < 128 && color !== '#000000') {
            break;
        }

        color = '#';
    }

    return color;
}

function getBrightness(color: string): number {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

function shuffleArray(arr: any[], specific_num?: number): any[] {
    const random_number = specific_num ? specific_num : Math.floor(Math.random() * arr.length) + 1;
    return [...arr.slice(arr.length - random_number), ...arr.slice(0, arr.length - random_number)];
}

export { createRouletteGifImage, shuffleArray, getRandomDarkHexCode, createRouletteImage, getRandomNumber };
