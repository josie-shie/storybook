import { IconCloudUpload } from '@tabler/icons-react';
import { Button, Slider } from '@mui/material';
import Image from 'next/image';
import type { ReactCropperElement } from 'react-cropper';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import type { ChangeEvent, DragEvent } from 'react';
import { useRef, useState } from 'react';
import style from './baseCropper.module.scss';

export interface BaseCropperProps {
    /**
     * When clicking on the confirm button or after cropping, it will return a file format.
     *
     * 按下確定或確定才切後會回傳一個檔案格式
     */
    setImgFile: (arg: Blob) => void;

    /**
     * Controls the shape of the cropping frame, default is round.
     *
     * 控制才切圖片的外框形狀 預設為圓型
     */
    circleCropper?: boolean;

    /**
     * Controls whether the cropping function appears.
     *
     *  控制是否要出現裁切圖片功能
     */
    showCropper?: boolean;

    /**
     * You can pass in the image to be edited from outside.
     *
     * 可以將要編輯的圖片從外部傳進來
     */
    imgSrc?: string;

    /**
     * Defines the width of the component.
     *
     * 定義元件的寬度
     */
    containerWidth?: string;
}

function BaseCropper({
    containerWidth = '100%',
    showCropper = true,
    imgSrc,
    setImgFile,
    circleCropper = true
}: BaseCropperProps) {
    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState(imgSrc);

    const cropperRef = useRef<ReactCropperElement>(null);
    const [zoomValue, setZoomValue] = useState(0.3);

    const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setUploadImage(files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setUploadImage(files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleConfirm = () => {
        if (showCropper) {
            const cropperInstance = cropperRef.current?.cropper;
            if (typeof cropperInstance !== 'undefined') {
                const canvas = cropperInstance.getCroppedCanvas();
                canvas.toBlob(blob => {
                    if (blob) setImgFile(blob);
                }, 'image/jpeg');
            }
        } else if (uploadImage) setImgFile(uploadImage);
    };

    return (
        <div className={style.baseCropper} style={{ width: containerWidth }}>
            <input
                id="file"
                name="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
            />
            {!previewImage ? (
                <label htmlFor="file">
                    <div
                        className={style.uploadContainer}
                        onDragOver={e => {
                            e.preventDefault();
                        }}
                        onDrop={handleFileDrop}
                    >
                        <div className={style['previewImage--noImg']}>
                            <IconCloudUpload color="#333" size={70} strokeWidth={1} />
                            點擊或拖曳上傳圖片
                        </div>
                    </div>
                </label>
            ) : (
                <>
                    <div
                        className={style.uploadContainer}
                        onDragOver={e => {
                            e.preventDefault();
                        }}
                        onDrop={handleFileDrop}
                    >
                        <div className={style.previewImage}>
                            {showCropper ? (
                                <Cropper
                                    aspectRatio={1}
                                    background={false}
                                    className={circleCropper ? style['circle-cropper'] : ''}
                                    cropBoxMovable={false}
                                    cropBoxResizable={false}
                                    dragMode="move"
                                    ref={cropperRef}
                                    src={previewImage}
                                    style={{ height: '100%', width: '100%' }}
                                    viewMode={1}
                                    zoomOnWheel={false}
                                    zoomTo={zoomValue}
                                />
                            ) : (
                                <Image
                                    alt="Selected preview"
                                    className={style['previewImage--mage']}
                                    src={previewImage}
                                />
                            )}
                        </div>
                    </div>
                    <div className={style.controlBar}>
                        {showCropper ? (
                            <div className={style['controlBar--sliderBar']}>
                                <Slider
                                    max={1}
                                    min={0.3}
                                    onChange={(e, newValue) => {
                                        setZoomValue(newValue as number);
                                    }}
                                    size="small"
                                    step={0.1}
                                    value={zoomValue}
                                />
                            </div>
                        ) : null}
                        <div className={style.buttonGroup}>
                            <Button onClick={handleButtonClick}>重新上傳</Button>
                            <Button onClick={handleConfirm}>
                                {showCropper ? '確定裁切' : '確定'}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export { BaseCropper };
