import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { UpdateFixedAssetsDialog } from './update-fixed-assets-dialog';

describe('UpdateFixedAssetsDialog', () => {
  let component: UpdateFixedAssetsDialog;
  let fixture: ComponentFixture<UpdateFixedAssetsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFixedAssetsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateFixedAssetsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have assetTypes defined', () => {
    expect(component.assetTypes).toBeDefined();
    expect(component.assetTypes.length).toBeGreaterThan(0);
  });

  it('should have modalTitle as input', () => {
    expect(component.modalTitle).toBeDefined();
  });

  it('hideDialog should emit dialogClosed', () => {
    component.fixedAssetsDialog = true;
    const emitSpy = vi.spyOn(component.dialogClosed, 'emit');

    component.hideDialog();

    expect(component.fixedAssetsDialog).toBe(false);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('saveFixedAssetHandler should emit fixedAssetSaved when form is valid', () => {
    component.fixedAssetsDialog = true;
    const emitSpy = vi.spyOn(component.fixedAssetSaved, 'emit');

    // Create a mock form with valid state
    component.fixedAssetsForm = {
      valid: true,
    } as never;

    component.saveFixedAssetHandler();

    expect(emitSpy).toHaveBeenCalled();
    expect(component.fixedAssetsDialog).toBe(false);
  });

  it('saveFixedAssetHandler should not emit when form is invalid', () => {
    component.fixedAssetsDialog = true;
    const emitSpy = vi.spyOn(component.fixedAssetSaved, 'emit');

    // Create a mock form with invalid state
    component.fixedAssetsForm = {
      valid: false,
    } as never;

    component.saveFixedAssetHandler();

    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.fixedAssetsDialog).toBe(true);
  });
});
